import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet'

const MetaWrapper = ({ title = '', description = '', keywords = '', children }) => {
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
        <meta property='og:image' content='' />
        <meta property='og:image:width' content='' />
        <meta property='og:image:height' content='' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Rentorr' />
        <meta property='og:description' content='' />
        <meta property='og:url' content='' />
        <meta property='og:site_name' content='Rentorr' />
        <meta name='twitter:card' content='summary' />
        <meta name='theme-color' content='' />
      </Helmet>
      <>
        {children}
      </>
    </>
  )
}

export default MetaWrapper
