import React from 'react';
import classes from './body.module.scss';
import Product from '../../components/Product';
import { Grid, Pagination } from '@mui/material';
import { MainContainer } from '../../components/Container';
import SearchIcon from '@mui/icons-material/Search';
import HeaderTitle from '../../components/HeaderTitle';
import { useSelector } from 'react-redux';
import { productSelector } from '../../../../redux/selectors';
import { useLocation, useParams } from 'react-router-dom';
import shuffle from '../../../../logic/shuffle';
import queryString from 'query-string';

function Body(props) {
    const { type } = useParams();
    const productsRefs = useSelector(productSelector);
    const location = useLocation();
    let products = (() => {
        if (type === 'all')
            return shuffle([
                ...productsRefs.book,
                ...productsRefs.clothes,
                ...productsRefs.laptop
            ]);
        if (type === 'book') return productsRefs.book;
        if (type === 'laptop') return productsRefs.laptop;
        if (type === 'clothes') return productsRefs.clothes;
        if (type === 'recommended')
            return shuffle([
                ...productsRefs.book,
                ...productsRefs.clothes,
                ...productsRefs.laptop
            ]);
        if (type === 'top-sale')
            return shuffle([
                ...productsRefs.book,
                ...productsRefs.clothes,
                ...productsRefs.laptop
            ]);
    })();
    if (products === undefined) return null;
    const params = queryString.parse(location.search);
    for (const key in params) {
        if (key == 'search') {
            products = products.filter((product) =>
                product.title.includes(params[key])
            );
            continue;
        }
        const pathQueries = key.split('_');
        products = products.filter((product) => {
            let q = product;
            pathQueries.forEach((pathQuery) => (q = q[pathQuery]));
            return q === params[key];
        });
    }
    console.log(products);
    return (
        <MainContainer>
            <HeaderTitle
                Icon={SearchIcon}
                title="Sản phẩm tìm kiếm"
                color="primary"
            />

            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                {products.map((product) => (
                    <Grid item xs={3} key={`${product.type}-${product.id}`}>
                        <Product item={product} />
                    </Grid>
                ))}
            </Grid>

            <div className={classes.paginationContainer}>
                <Pagination count={10} variant="outlined" color="primary" />
            </div>
        </MainContainer>
    );
}

Body.propTypes = {};

export default Body;
