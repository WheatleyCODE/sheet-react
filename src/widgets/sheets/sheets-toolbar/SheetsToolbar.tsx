import { FC } from 'react';
import { Button, Title } from 'shared/ui';
import {
  MdRedo,
  MdUndo,
  MdOutlineFormatPaint,
  MdOutlineLocalPrintshop,
  MdCurrencyRuble,
  MdPercent,
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatColorText,
  MdFormatColorFill,
  MdBorderAll,
  MdFormatAlignLeft,
  MdVerticalAlignBottom,
  MdWrapText,
  MdOutlineTextRotationNone,
  MdOutlineFilterAlt,
  MdFunctions,
} from 'react-icons/md';
import { FontFamily } from 'features';
import styles from './SheetsToolbar.module.css';

export const SheetsToolbar: FC = () => {
  return (
    <div className={styles.toolbar}>
      {/* ! TEMPLATE */}
      <div className={styles.main}>
        <Title text="Отменить">
          <Button className={styles.button} Icon={MdUndo} />
        </Title>
        <Title text="Повторить">
          <Button className={styles.button} Icon={MdRedo} />
        </Title>

        <div className={styles.space} />

        <Button className={styles.button} Icon={MdOutlineLocalPrintshop} />
        <Button className={styles.button} Icon={MdOutlineFormatPaint} />
        <Button className={styles.button} Icon={MdCurrencyRuble} />
        <Button className={styles.button} Icon={MdPercent} />

        <div className={styles.space} />

        <FontFamily />

        <div className={styles.space} />

        <Button className={styles.button} Icon={MdFormatBold} />
        <Title text="Курсив">
          <Button className={styles.button} Icon={MdFormatItalic} />
        </Title>
        <Title text="Зачеркнутый текст">
          <Button className={styles.button} Icon={MdStrikethroughS} />
        </Title>
        <Button className={styles.button} Icon={MdFormatColorText} />
        <Button className={styles.button} Icon={MdFormatColorFill} />

        <div className={styles.space} />

        <Button className={styles.button} Icon={MdBorderAll} />
        <Button className={styles.button} Icon={MdFormatAlignLeft} />
        <Button className={styles.button} Icon={MdVerticalAlignBottom} />
        <Button className={styles.button} Icon={MdWrapText} />
        <Button className={styles.button} Icon={MdOutlineTextRotationNone} />

        <div className={styles.space} />

        <Button className={styles.button} Icon={MdOutlineFilterAlt} />
        <Button className={styles.button} Icon={MdFunctions} />
      </div>
    </div>
  );
};
