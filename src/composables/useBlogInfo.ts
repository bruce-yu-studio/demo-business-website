import { BlogCardType } from '~/components/BlogCard.vue'


interface ObjectType {
  [ key: string ]: any
}

export const useBlogInfo = ( blogResult: ObjectType[] ): BlogCardType[] => {

  const appPath = useAppPath()

  return blogResult.map( ({ title , description , image , _path }) =>
    ({
      title,
      description,
      image: appPath( image || '/images/fakecompany.png' ),
      href: `/blog/${ _path.split( '/' )[ 2 ] }`,
    })
  )

}