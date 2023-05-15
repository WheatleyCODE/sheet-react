import { FC } from 'react';
import { v4 } from 'uuid';
import { TemplateCard } from 'features';
import styles from './CreateSheetsTemplates.module.css';

export const CreateSheetsTemplates: FC = () => {
  return (
    <div className={styles.templates}>
      <div className={styles.menu}>
        <TemplateCard
          path={`sheets/${v4()}`}
          noAnimate
          src="https://ssl.gstatic.com/docs/templates/thumbnails/sheets-blank-googlecolors.png"
          text="Создать"
        />
        <TemplateCard
          path={`sheets/${v4()}`}
          src="https://ssl.gstatic.com/docs/templates/thumbnails/1SriD03WRe1m0RypiegbExzGD5BCx0e0n8Np3gD33_nQ_400_2.png"
          text="Список дел"
        />
        <TemplateCard
          path={`sheets/${v4()}`}
          src="https://ssl.gstatic.com/docs/templates/thumbnails/1_X-7AYELbOE-RR_wyBVNhkQGjYAY5T7bZJmwdwC4gRY_400.png"
          text="Трекер инвестиций"
        />
        <TemplateCard
          path={`sheets/${v4()}`}
          src="https://ssl.gstatic.com/docs/templates/thumbnails/11Q2kegPjRTYFJatnE5Im8A1_MlpCVprlOFCkyq8WHWM_400_1.png"
          text="Плюссы и минусы"
        />
        <TemplateCard
          path={`sheets/${v4()}`}
          src="https://ssl.gstatic.com/docs/templates/thumbnails/1lufrJrPnWefpzS6zS4t5d0BoXUtqpTmgLJUO-1hqbpY_400.png"
          text="План проекта"
        />
      </div>
    </div>
  );
};
