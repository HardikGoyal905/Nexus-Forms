export function validateAllPlugins(plugins, form_id, response) {
  for (const plugin of plugins) {
    import("./" + plugin + "-plugin.mjs").then((pluginModule) => {
      for (const pluginClass of Object.values(pluginModule)) {
        const pluginInstance = new pluginClass();
        pluginInstance.validationChecks(form_id, response);
      }
    });
  }
}

export function runAllPlugins(plugins, form_id, response, databaseResponse) {
    for (const plugin of plugins) {
      import("./" + plugin + "-plugin.mjs").then((pluginModule) => {
        for (const pluginClass of Object.values(pluginModule)) {
          const pluginInstance = new pluginClass();
          pluginInstance.run(form_id, response, databaseResponse);
        }
      });
    }
}

export function checkForValidPlugins(plugins) {
    for (const plugin of plugins) {
      import("./" + plugin + "-plugin.mjs").then((pluginModule) => {
      }).catch((error) => {
        throw new Error("Invalid plugin: " + plugin)
      });
    }
}

export class Plugins {
    validationChecks(form_id, response) {

    }

    run(form_id, response, databaseResponse) {
        
    }
}