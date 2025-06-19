// Module Registry - Central registration for all application modules

export interface Module {
  name: string;
  path: string;
  dependencies?: string[];
  initialized: boolean;
  initialize?: () => Promise<void>;
}

class ModuleRegistry {
  private modules: Map<string, Module> = new Map();

  register(module: Module): void {
    if (this.modules.has(module.name)) {
      throw new Error(`Module ${module.name} is already registered`);
    }
    this.modules.set(module.name, module);
  }

  get(moduleName: string): Module | undefined {
    return this.modules.get(moduleName);
  }

  getAll(): Module[] {
    return Array.from(this.modules.values());
  }

  async initializeAll(): Promise<void> {
    const modules = this.getAll();
    
    // Sort modules by dependencies
    const sortedModules = this.topologicalSort(modules);
    
    // Initialize modules in order
    for (const module of sortedModules) {
      if (module.initialize && !module.initialized) {
        await module.initialize();
        module.initialized = true;
      }
    }
  }

  private topologicalSort(modules: Module[]): Module[] {
    const sorted: Module[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (module: Module) => {
      if (visiting.has(module.name)) {
        throw new Error(`Circular dependency detected: ${module.name}`);
      }
      if (visited.has(module.name)) {
        return;
      }

      visiting.add(module.name);

      if (module.dependencies) {
        for (const dep of module.dependencies) {
          const depModule = this.modules.get(dep);
          if (depModule) {
            visit(depModule);
          }
        }
      }

      visiting.delete(module.name);
      visited.add(module.name);
      sorted.push(module);
    };

    for (const module of modules) {
      visit(module);
    }

    return sorted;
  }
}

// Singleton instance
export const moduleRegistry = new ModuleRegistry();

// Register core modules
export const registerCoreModules = () => {
  moduleRegistry.register({
    name: 'auth',
    path: '/modules/auth',
    initialized: false,
  });

  moduleRegistry.register({
    name: 'catalog',
    path: '/modules/catalog',
    dependencies: ['auth'],
    initialized: false,
  });

  moduleRegistry.register({
    name: 'payment',
    path: '/modules/payment',
    dependencies: ['auth'],
    initialized: false,
  });

  moduleRegistry.register({
    name: 'dashboard',
    path: '/modules/dashboard',
    dependencies: ['auth', 'catalog', 'payment'],
    initialized: false,
  });
};