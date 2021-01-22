import React, { useState } from 'react';
import { Button, Link, Grid, Typography, CircularProgress, TextField, Box, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import ErrorSnackbar from 'Components/ErrorSnackbar';
import { StringUtil, WebStorageHelper } from 'Util/Helpers';
import AuthContainer from './AuthContainer';
import { withOnChangeDebounced } from 'Components/withOnChangeDebounced';
import { useTranslation } from "react-i18next";
import { green } from '@material-ui/core/colors';
import { AuthService } from 'Services/AuthService';
import Logger from 'Util/Logger';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    btnBusyInd: {
        color: green[500]
    }
}));

function ErrorBlock(props) {
    const { errorMsg } = props;

    if (StringUtil.isNullOrEmpty(errorMsg))
        return null;

    return (
        <Grid item xs={12}>
            <ErrorSnackbar message={errorMsg} />
        </Grid>);
}

function textFieldProps(name, value, error) {
    const p = {
        id: name,
        name: name,
        defaultValue: value || '', // uncontrolled component
        error: !StringUtil.isNullEmptyOrWhiteSpace(error),
        helperText: error
    };

    return p;
}

const logger = new Logger(Login.name);

const TextFieldDebounced = withOnChangeDebounced(TextField, 500);

const usernameInitial = WebStorageHelper.getItemFromDisk('login_page', 'username');
let rememberMeInitial = false;

if(!StringUtil.isNullOrEmpty(usernameInitial)) {
    rememberMeInitial = true;
}

function Login(props) {
    const classes = useStyles();

    const [username, setUsername] = useState(usernameInitial);
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [rememberMe, setRememberMe] = useState(rememberMeInitial);

    const [errorMsg, setErrorMsg] = useState('');
    const [busy, setBusy] = useState(false);

    const { t } = useTranslation();

    const SignUpLink = React.forwardRef((props, ref) => (
        <RouterLink innerRef={ref} to={{ pathname: '/signup', search: window.location.search }} {...props} />
    ));

    function validateInputs() {
        let valid = true;

        if (StringUtil.isNullEmptyOrWhiteSpace(username)) {
            setUsernameError('Required');
            valid = false;
        }

        if (StringUtil.isNullEmptyOrWhiteSpace(password)) {
            setPasswordError('Required');
            valid = false;
        }

        return valid;
    }

    function usernameChange(e) {
        const newVal = e.target.value;

        if (!StringUtil.isNullEmptyOrWhiteSpace(newVal) && !StringUtil.isNullOrEmpty(usernameError)) {
            setUsernameError('');
        }

        setUsername(newVal);
    }

    function passwordChange(e) {
        const newVal = e.target.value;

        if (!StringUtil.isNullEmptyOrWhiteSpace(newVal) && !StringUtil.isNullOrEmpty(passwordError)) {
            setPasswordError('');
        }

        setPassword(newVal);
    }

    
    function rememberMeChange(e) {
        const newVal = e.target.checked;

        setRememberMe(newVal);

        if(newVal === false) {
            WebStorageHelper.removeFromDisk('login_page', 'username');
        }
    }

    async function doLogin(event) {
        event.preventDefault(); // importan otherwise the form will try to post

        setUsernameError('');
        setPasswordError('');
        setErrorMsg('');

        if (!validateInputs()) {
            return;
        }

        setBusy(true);

        try {
            const resp = await AuthService.authClient.signInWithCredentials({
                username,
                password
            });

            const sessionToken = resp.sessionToken;

            if(rememberMe)
            {
                WebStorageHelper.setItemToDisk('login_page', 'username', username);
            }

            // const usernameFromUserObj = resp.user.profile.login;

            await AuthService.authClient.signInWithRedirect({ sessionToken });
        }
        catch (err) {
            setBusy(false);
            
            logger.error("Error logging in", err);

            setErrorMsg("Could not log you in. Please check your credentials.");
        }
    }

    return (
        <AuthContainer>
            <Typography component="h1" variant="h5">
                Sign-In
        </Typography>
            <form className={classes.form} noValidate onSubmit={doLogin}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldDebounced
                            variant="outlined"
                            required
                            fullWidth
                            label={t("Username")}
                            autoComplete="username"
                            onChange={usernameChange}
                            {...textFieldProps("Username", username, usernameError)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldDebounced
                            variant="outlined"
                            required
                            fullWidth
                            label={t("Password")}
                            type="password"
                            autoComplete="new-password"
                            onChange={passwordChange}
                            {...textFieldProps("Password", password, passwordError)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={rememberMeChange}
                                    name="rememberMe"
                                    color="primary"
                                />
                            }
                            label="Remember Me"
                        />
                    </Grid>
                    <ErrorBlock errorMsg={errorMsg} />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={busy}
                >
                    Login
                </Button>
                {busy &&
                    <Box display="flex" justifyContent="center" mb={3}>
                        <CircularProgress className={classes.btnBusyInd} />
                    </Box>
                }
                {!busy &&
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={SignUpLink} variant="body2">
                                Don't have an account? Sign Up
                        </Link>
                        </Grid>
                    </Grid>
                }
            </form>
        </AuthContainer>
    );
}

export default Login;