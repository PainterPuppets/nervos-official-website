import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { Description, DescriptionType } from './Description'
import { Functions, FunctionsType } from './Functions'
import { Header, HeaderType } from './Header'
import { Info, InfoType } from './Info'
import { Resources, ResourcesType } from './Resources'
import { Positions, PositionsType } from './Positions'
import { ProgressBar } from './ProgressBar'
import { FunctionsItemType } from './FunctionsItem'

import styles from './index.module.scss'
import { Supports } from './Supports'
import { Page } from '../Page'
import { useHeaderHeight } from '../Header'

export type BaseSeparatePageType = HeaderType &
  DescriptionType &
  Partial<PositionsType> &
  Partial<InfoType> &
  FunctionsType &
  Partial<ResourcesType> & {
    functionsExtensionTitle?: {
      extensionTitle: string | ReactNode
      extensionTitleFunctions: FunctionsItemType[]
    }
    editLink?: string
    isProgressBar?: boolean
    isNeedSupports?: boolean
    headerClassName?: string
    descriptionClassName?: string
    infoClassName?: string
    functionsClassName?: string
    functionsTitleClassName?: string
    extensionTitleFunctionsClassName?: string
    embellishedElements?: {
      content: ReactNode
      top?: number
      right?: number
      left?: number
    }[]
  }

export const BaseSeparatePage: FC<BaseSeparatePageType> = props => {
  const {
    className,
    headerClassName,
    descriptionClassName,
    infoClassName,
    functionsClassName,
    functionsTitleClassName,
    extensionTitleFunctionsClassName,
    embellishedElements,
    title,
    floatIcons,
    description,
    positionsData,
    info,
    editor,
    functions,
    functionsExtensionTitle,
    editLink,
    isProgressBar = true,
    isNeedSupports = false,
    resourceData,
    ...rest
  } = props

  const headerHeight = useHeaderHeight()

  const FunctionsContainer = ({
    functions,
    isProgressBar,
    className,
  }: {
    functions: FunctionsItemType[]
    isProgressBar?: boolean
    className?: string
  }) => (
    <div className={styles.functionsWrap}>
      <Functions isProgressBar={isProgressBar} functions={functions} className={className} />
      {/* Todo: progressbar need complete later*/}
      {isProgressBar ? <ProgressBar className={clsx(styles.progressBar)} editLink={editLink} /> : null}
    </div>
  )

  return (
    <Page className={clsx(styles.baseSeparatePage, className)} {...rest}>
      <div className={styles.embellishedElementsContainer}>
        <div className={styles.embellishedElements}>
          {embellishedElements?.map((embellishedElement, idx) => (
            <div
              key={idx}
              className={clsx(styles.embellishedElement)}
              style={{
                top: embellishedElement.top ? embellishedElement.top + headerHeight : undefined,
                right: embellishedElement.right,
                left: embellishedElement.left,
              }}
            >
              {embellishedElement.content}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <Header className={clsx(styles.headerClassName, headerClassName)} title={title} floatIcons={floatIcons} />
        <div className={styles.descriptionWrap}>
          <Description className={descriptionClassName} description={description} />
        </div>

        {positionsData ? (
          <div className={styles.positionsWrap}>
            <Positions positionsData={positionsData} />
          </div>
        ) : null}
        {info ? (
          <div className={styles.infoWrap}>
            <Info className={infoClassName} info={info} editor={editor} editLink={editLink} />
          </div>
        ) : null}

        {functionsExtensionTitle?.extensionTitle ? (
          <div className={clsx(styles.functionsTitleWrap, functionsTitleClassName)}>
            {functionsExtensionTitle.extensionTitle}
          </div>
        ) : null}

        {functionsExtensionTitle?.extensionTitleFunctions ? (
          <FunctionsContainer
            functions={functionsExtensionTitle.extensionTitleFunctions}
            isProgressBar={isProgressBar}
            className={extensionTitleFunctionsClassName}
          />
        ) : null}
        {isNeedSupports ? (
          <div className={clsx(styles.supportsWrap)}>
            <Supports />
          </div>
        ) : null}

        <FunctionsContainer functions={functions} isProgressBar={isProgressBar} className={functionsClassName} />

        {resourceData ? (
          <div className={styles.resourcesWrap}>
            <Resources resourceData={resourceData} />
          </div>
        ) : null}
      </div>
    </Page>
  )
}
