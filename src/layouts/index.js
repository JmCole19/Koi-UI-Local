/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import Footer from './Footer';
import { PageLayoutContainer } from './style';
import Topbar from './Topbar';
import {AnnounceContext} from "contexts/AnnounceContextContainer";

const PageLayout = ({ children }) => {
  const { message } = useContext(AnnounceContext)
  console.log('announcement message : ', message)
  return (
    <PageLayoutContainer>
      <Topbar />
      <div className='page-content'>
        {message && 
          <div className='announcement-area'>
            <div className='container'>
              <div className='message-area'>{message}</div>
            </div>
          </div>
        }
        {children}
      </div>
      <Footer />
    </PageLayoutContainer>
  );
}

export default PageLayout;