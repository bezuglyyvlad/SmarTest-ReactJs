import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography"
import overallSructureXml from "../../images/overallSructureXml.png"
import questionXml from "../../images/questionXml.png"
import answersXml from "../../images/answersXml.png"
import ImageBox from "../common/UIElements";

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
}));

const XmlDocumentation = React.memo(() => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Документація для створення XML-файла
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
                Синтаксичний аналізатор XML передбачає, що файл XML правильно сформований і не виявляє і не повідомляє
                про помилки. Якщо це не так, ви, швидше за все, отримаєте несподівані помилки. Якщо ви вручну кодуєте
                XML-файл, рекомендується перед його імпортом в пропустити його через якийсь
                XML-верифікатор.
            </Typography>
            <Typography component="h2" variant="h6">
                Загальна структура файла XML
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
                Файл обгорнутий в теги наступним чином.
            </Typography>
            <ImageBox imageSrc={overallSructureXml} imageW={266} imageH={125}/>
            <Typography variant="body1" className={classes.bodyText}>
                Файл повинен бути закодований в UTF-8 та вказаний в файлі, як це показано вище.
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
                Імпорт і експорт однакові по функціональності, тому, якщо вам потрібно зрозуміти формат,
                ви можете просто створити кілька питань і експортувати їх, щоб подивитися, як вони виглядають.
            </Typography>
            <Typography component="h2" variant="h6">
                Теги, які використовуються для питань
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
                У тезі {"<root>"} є будь-яка кількість тегів {"<question>"}.
            </Typography>
            <ImageBox imageSrc={questionXml} imageW={416} imageH={231}/>
            <Typography variant="body1" className={classes.bodyText}>
                Кожне питання потребує наступні обов'язкові теги:
            </Typography>
            <Typography component="ul" variant="body1" className={classes.bodyText}>
                <li>{"<text>"} - текст питання;</li>
                <li>{"<lvl>"} - складність питання (1 - легкий, 2 - середній, 3 - складний);</li>
                <li>{"<type>"} - тип питання (1 - одиночний, 2 - множинний);</li>
                <li>{"<description>"} - опис для роз'яснення правильної відповіді;</li>
                <li>{"<answers>"} - відповіді (мінімімум 2, одна з яких вірна).</li>
            </Typography>
            <Typography component="h2" variant="h6">
                Теги, які використовуються для відповідей
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
                У тегах {"<question>"} є необхідна кількість тегів {"<answers>"}.
            </Typography>
            <ImageBox imageSrc={answersXml} imageW={229} imageH={80}/>
            <Typography variant="body1" className={classes.bodyText}>
                Кожна відповідь потребує наступні обов'язкові теги:
            </Typography>
            <Typography component="ul" variant="body1" className={classes.bodyText}>
                <li>{"<text>"} - текст відповіді;</li>
                <li>{"<is_right>"} - чи є відповідь вірною (0 - ні, 1 - так).</li>
            </Typography>
        </Container>
    );
});

export default XmlDocumentation;