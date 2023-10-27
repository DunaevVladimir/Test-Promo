import { memo } from 'react';
import './styles.scss';

type PageLayoutProps = {
  children: React.ReactNode
}

function PageLayout({children}: PageLayoutProps) {

  return (
    <div className='PageLayout'>
      {children}
    </div>
  )
}

export default memo(PageLayout);