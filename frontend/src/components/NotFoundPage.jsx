import { Link } from 'react-router-dom'
import notFoundImg from '../assets/404_notFound_img.svg'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center my-auto">
      <img
        alt={t('p404.notFound')}
        className="img-fluid h-25"
        src={notFoundImg}
      />
      <h1 className="h4 text-muted mt-3">{t('p404.notFound')}</h1>
      <p className="text-muted">
        {t('p404.mainPageLinkPrefix')}
        <Link to="/">{t('p404.mainPageLinkText')}</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
