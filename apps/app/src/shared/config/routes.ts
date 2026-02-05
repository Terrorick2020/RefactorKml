export namespace AppsRoutes {
  export type TARItemType = 'string' | 'number';
  export const markName: string = 'mark';

  export const appRoutes = {
    glob: '',
    auth: {
      glob: '/auth',
      inner: {
        signIn: 'sign-in',
        signUp: 'sign-up'
      }
    },
    gis: {
      glob: '/gis',
      inner: {
        list: 'list',
        item: {
          value: `list/:${markName}`,
          type: 'string' as TARItemType,
        }
      }
    },
    blocked: '/blocked',
    error: '/error',
    notFound: '*',
  } as const;

  export const apiRoutes = {
    glob: '',
  } as const;
}
