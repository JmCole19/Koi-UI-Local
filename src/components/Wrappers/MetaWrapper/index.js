import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet'

const MetaWrapper = ({ 
  title = '', 
  description = 'Koi Leaderboard | Earn KOI for attention', 
  keywords = '', 
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
        <meta name="og:title" content="Koi Leaderboard | Earn KOI for attention" />
        <meta name="og:description" content="Contribute extra computation, earn your share." />
        <meta name="og:image" content="https://koi.rocks/koi-360x250.png" />
        <meta property="og:image" content="https://koi.rocks/koi-360x250.png" />
        <meta name="twitter:image" content="https://koi.rocks/koi-360x250.png" />
        <meta name="og:url" content="https://koi.rocks/" />
        <meta name="og:url" content="https://koi.rocks/" />
        <meta name="og:type" content="website" />
        <meta property="og:title" content="Koi Leaderboard | Earn KOI for attention" />
        <meta property="og:description" content="We're the record for web3. Become a witness today!" />
        <meta property="og:url" content="https://koi.rocks/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Permenant Record | KOI" />
        <meta name="twitter:description" content="Contribute extra computation, earn your share." />
        <meta name="twitter:creator" content="" />
      </Helmet>
      <>
        {children}
      </>
    </>
  )
}

export default MetaWrapper
