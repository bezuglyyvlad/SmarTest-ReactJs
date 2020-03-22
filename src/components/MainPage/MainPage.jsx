import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        marginTop: theme.spacing(5),
    },
    paper: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(15, 2)
    },
    title: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(5)
    }
}));

const MainPage = React.memo(() => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant='h4' component='h1' className={classes.title}>
                    Попробуйте динамическое тестирование с SmarTest
                </Typography>
                <Typography variant='h5'>
                    Тест будет подстраиваться под ваш уровень знаний.
                    Проверь свои знания прямо сейчас.
                </Typography>
                <Button component={NavLink} to='/category' variant="contained" color="primary"
                        className={classes.button}>
                    Начать
                </Button>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant='h4' component='h1' className={classes.title}>
                    Наш сервис сделан в виде PWA приложения
                </Typography>
                <Typography variant='h5'>
                    Теперь не нужно скачивать приложение через сторонние магазины. Нужно всего лишь подтвердить
                    предложение для установки либо сделать это вручную (смотреть в руководстве для вашего браузера)
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant='h4' component='h1' className={classes.title}>
                    Стать Експертом
                </Typography>
                <Typography variant='h5'>
                    Хотите стать Экспертом и создавать тесты самому? Тогда свяжитесь с администратором - notrealemail@gmail.com
                </Typography>
            </Paper>
        </Container>
    );
});

export default MainPage;