import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet'

const MetaWrapper = ({ 
  title = 'Koi Leaderboard | Earn KOI for attention', 
  description = 'Koi Leaderboard | Earn KOI for attention', 
  keywords = '', 
  url = 'https://koi.rocks/',
  imageUrl = 'https://koi.rocks/koi-360x250.png', 
  children 
}) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [children])
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='robots' content='index,follow' />
        <meta name='keywords' content={keywords} />
        <meta name="theme-color" content="#000000" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={imageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="og:url" content={url} />
        <meta name="og:url" content={url} />
        <meta name="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="" />
      </Helmet>
      <>
        {children}
      </>
    </>
  )
}

export default MetaWrapper
