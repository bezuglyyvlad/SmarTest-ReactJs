import { memo } from 'react'
import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
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
}))

const MainPage = memo(() => {
  const classes = useStyles()
  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant='h4' component='h1' className={classes.title}>
          Спробуйте динамічне тестування з SmarTest
        </Typography>
        <Typography variant='h5'>
          Тест буде підлаштовуватися під ваш рівень знань. Перевір свої знання прямо зараз.
        </Typography>
        <Button component={NavLink} to='/category' variant='contained' color='primary'
                className={classes.button}>
          Почати
        </Button>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant='h4' component='h2' className={classes.title}>
          Наш сервіс зроблений у вигляді PWA
        </Typography>
        <Typography variant='h5'>
          Працюйте швидше, переглядайте дані в офлайні, встановлюйте додаток на будь-які платформи прямо з
          браузера і тепер не думайте про поновлення програми.
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant='h4' component='h2' className={classes.title}>
          Стати Експертом
        </Typography>
        <Typography variant='h5'>
          Хочете стати Експертом і створювати тести самому? Тоді зв'яжіться з адміністратором -
          notrealemail@gmail.com
        </Typography>
      </Paper>
    </Container>
  )
})

export default MainPage
