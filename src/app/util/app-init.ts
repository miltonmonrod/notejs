import { KeycloakService } from 'keycloak-angular';


export function initializer(
  keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      
      try {
        
          await keycloak.init({
            config: {
              url: 'http://172.16.60.51:8182/auth',
              realm: 'InvimaExternos',
              clientId: 'account'
            },
            initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: [
              '/assets',
              '/inicio'
            ],
          });
        
        resolve();
      } catch (error) {
       
      }
    });
  };
}