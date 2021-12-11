import React, { memo } from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import overallStructureXml from '../../images/overallStructureXml.png'
import questionXml from '../../images/questionXml.png'
import answersXml from '../../images/answersXml.png'
import ImageBox from '../common/UIElements'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  bodyText: {
    margin: theme.spacing(2, 0)
  }
}))

const XmlDocumentation = memo(() => {
  const classes = useStyles()

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Typography component='h1' variant='h5' align='center' className={classes.title}>
        Документація для створення XML-файла
      </Typography>
      <Typography variant='body1' className={classes.bodyText}>
        Синтаксичний аналізатор XML передбачає, що файл XML правильно сформований і не буде повідомляти
        про помилки в разі їх виникнення. Якщо ви вручну кодуєте XML-файл, рекомендується перед його імпортом
        пропустити його через якийсь XML-верифікатор.
      </Typography>
      <Typography component='h2' variant='h6'>
        Загальна структура XML файла
      </Typography>
      <Typography variant='body1' className={classes.bodyText}>
        Файл обгорнутий в теги наступним чином.
      </Typography>
      <ImageBox imageSrc={overallStructureXml} imageW={423} imageH={168} />
      <Typography variant='body1' className={classes.bodyText}>
        Файл повинен бути закодований в UTF-8 та вказаний в файлі, як це показано вище.
      </Typography>
      <Typography variant='body1' className={classes.bodyText}>
        Імпорт і експорт однакові по функціональності, тому, якщо вам потрібно зрозуміти формат,
        ви можете просто створити кілька питань і експортувати їх, щоб подивитися, як вони виглядають.
      </Typography>
      <Typography component='h2' variant='h6'>
        Теги, які використовуються для питань
      </Typography>
      <Typography variant='body1' className={classes.bodyText}>
        У тезі {'<root>'} є необхідна кількість тегів {'<question>'} (максимум 300).
      </Typography>
      <ImageBox imageSrc={questionXml} imageW={548} imageH={393} />
      <Typography variant='body1' className={classes.bodyText}>
        Кожне питання потребує наступні обов`язкові теги:
      </Typography>
      <Typography component='ul' variant='body1' className={classes.bodyText}>
        <li>{'<text>'} - текст питання;</li>
        <li>{'<description>'} - опис для роз`яснення правильної відповіді;</li>
        <li>{'<complexity>'} - складність;</li>
        <li>{'<significance>'} - значимість;</li>
        <li>{'<relevance>'} - актуальність;</li>
        <li>{'<type>'} - тип питання (1 - одиночний, 2 - множинний);</li>
        <li>{'<answers>'} - відповіді.</li>
      </Typography>
      <Typography component='h2' variant='h6'>
        Теги, які використовуються для відповідей
      </Typography>
      <Typography variant="body1" className={classes.bodyText}>
        У тегах {"<question>"} є необхідна кількість тегів {"<answers>"} (максимум 20).
      </Typography>
      <ImageBox imageSrc={answersXml} imageW={364} imageH={111} />
      <Typography variant="body1" className={classes.bodyText}>
        Кожна відповідь потребує наступні обов`язкові теги:
      </Typography>
      <Typography component="ul" variant="body1" className={classes.bodyText}>
        <li>{"<text>"} - текст відповіді</li>
        <li>{"<is_correct>"} - чи є відповідь вірною (0 - ні, 1 - так).</li>
      </Typography>
    </Container>
  )
})

export default XmlDocumentation
