import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button} from '@material-ui/core/';
import Cart from './Cart';

const Header = () => {
    return(
        <Grid className="navbar navbar-expand-lg navbar-light bg-light">
            <Grid className="container-fluid">
                <Link class="navbar-brand" to="/">
                    Dio Shopping
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Grid class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link 
                            className="nav-link"
                            to="/"
                        >
                            <Button>Home</Button>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link 
                            className="nav-link"
                            to="/mensagens"
                        >
                            <Button>Depoimentos</Button>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Cart 
                            className="nav-link"
                        />
                    </li>
                </ul>
                </Grid>
            </Grid>  
        </Grid>      
    )
}

export default Header;
