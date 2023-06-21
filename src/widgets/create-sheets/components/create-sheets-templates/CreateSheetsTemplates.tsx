import { FC } from 'react';
import { TemplateCard, TemplateList } from 'entities';
import { templates } from 'widgets/create-sheets/consts/templates';
import { getNewSheetsPath } from 'widgets/create-sheets/utils/getNewSheetsPath';
import styles from './CreateSheetsTemplates.module.css';

export const CreateSheetsTemplates: FC = () => {
  return (
    <div className={styles.templates}>
      <TemplateList>
        {templates.map(({ text, src, noAnimate }) => (
          <TemplateCard path={getNewSheetsPath()} noAnimate={noAnimate} src={src} text={text} />
        ))}
      </TemplateList>
    </div>
  );
};
