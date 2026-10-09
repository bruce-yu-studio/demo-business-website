import { joinURL } from 'ufo'


/**
 * 為站內絕對路徑補上 app.baseURL（例如部署在 GitHub Pages 子路徑 /repo-name/ 時）
 */
export const useAppPath = () => {

  const { baseURL } = useRuntimeConfig().app

  return ( path: string ) => ( path && path.startsWith( '/' ) && !path.startsWith( '//' ) )
    ? joinURL( baseURL , path )
    : path

}
