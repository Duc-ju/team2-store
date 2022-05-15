import React from 'react';
import classes from "./body.module.scss";
import {Grid, Skeleton} from "@mui/material";
import {MainContainer} from "../../components/Container";
import RatingAndComment from "./ratingAndComment";
import HeaderTitle from "../../components/HeaderTitle";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Product from "../../components/Product";
import Shortcut from "../../components/Shortcut";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function ProductDetailShimmer(props) {
    return (
        <>
            <div className={classes.roundedWhiteContainer}>
                <Skeleton
                    variant="text"
                    sx={{height: 32, width: '50%'}}
                />
            </div>
            <div className={classes.roundedWhiteContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Skeleton
                            width="100%"
                            height="250px"
                            variant="rectangular"
                        />
                        <Grid container spacing={2} sx={{mt: 0.5}}>
                            <Grid item xs={2.4}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Skeleton
                                    width="100%"
                                    height="40px"
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.headerContainer}>
                            <h2 className={classes.header}>
                                <Skeleton
                                    variant="text"
                                    sx={{height: 32}}
                                />
                            </h2>
                            <div className={classes.rowFlexContainer}>
                                <Skeleton
                                    variant="text"
                                    sx={{height: 32, width: '50%'}}
                                />
                            </div>
                            <div
                                className={classes.rowFlexContainer}
                                style={{marginTop: '8px'}}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{height: 32, width: '50%'}}
                                />
                            </div>
                            <MainContainer
                                style={{
                                    backgroundColor: 'var(--bg-base)',
                                    padding: '8px 16px'
                                }}
                            >
                                <div
                                    className={classes.rowFlexContainer}
                                >
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '100px',
                                            height: '32px'
                                        }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '100px',
                                            height: '32px',
                                            ml: 1
                                        }}
                                    />
                                </div>
                            </MainContainer>
                            <Grid container spacing={2} sx={{mt: 1}}>
                                <Grid item xs={2}>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '100%',
                                            height: '32px',
                                            ml: 1
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '100%',
                                            height: '32px',
                                            ml: 1
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{mt: 1}}>
                                <Grid item xs={2}>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '100%',
                                            height: '32px',
                                            ml: 1
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            width: '50%',
                                            height: '32px',
                                            ml: 1
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <div
                                className={classes.buttonGroupContainer}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        height: '32px',
                                        width: '100px'
                                    }}
                                />
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        height: '32px',
                                        width: '100px'
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton
                                    width="100%"
                                    height="150px"
                                    variant="rectangular"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton
                                    width="100%"
                                    height="150px"
                                    variant="rectangular"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <Grid container spacing={4}>
                <Grid item xs={9.5}>
                    <div
                        className={classes.roundedWhiteContainer}
                        style={{padding: '16px'}}
                    >
                        <Skeleton
                            variant="text"
                            sx={{height: 32, width: '50%'}}
                        />
                        <div className={classes.detailContainer}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '60%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '60%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '60%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '60%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={10}>
                                    <div
                                        className={
                                            classes.rowFlexContainer
                                        }
                                    >
                                        <Skeleton
                                            variant="text"
                                            sx={{
                                                height: 32,
                                                width: '60%'
                                            }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.contentHeader}>
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '50%'}}
                            />
                        </div>
                        <div className={classes.descriptionContainer}>
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '100%'}}
                            />
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '40%'}}
                            />
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '80%'}}
                            />
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '70%'}}
                            />
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '50%'}}
                            />
                            <Skeleton
                                variant="text"
                                sx={{height: 32, width: '60%'}}
                            />
                        </div>
                    </div>
                    <RatingAndComment/>
                    <HeaderTitle
                        Icon={CompareArrowsIcon}
                        color="primary"
                        title="Sản phẩm tương tự"
                        style={{marginTop: '16px'}}
                    />
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Shortcut
                                Icon={CompareArrowsIcon}
                                title="Xem tất cả"
                                className="bg-blue-linear"
                                link="/filter/likely"
                            />
                        </Grid>
                    </Grid>
                    <HeaderTitle
                        Icon={AddCircleIcon}
                        title="Sản phẩm thường được mua kèm"
                        style={{marginTop: '16px'}}
                    />
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={2.4}>
                            <Shortcut
                                Icon={AddCircleIcon}
                                title="Xem tất cả"
                                className="bg-red-linear"
                                link="/filter/likely"
                            />
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                        <Grid item xs={2.4}>
                            <Product showControl={false}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2.5}>
                    <div className={classes.baseContainer}>
                        <HeaderTitle
                            style={{padding: '8px'}}
                            title="Sản phẩm hot"
                            Icon={LocalFireDepartmentIcon}
                            color="error"
                        />
                    </div>
                    <Grid container spacing={2} sx={{mt: 0.5}}>
                        <Grid item xs={12}>
                            <Product/>
                        </Grid>
                        <Grid item xs={12}>
                            <Product/>
                        </Grid>
                        <Grid item xs={12}>
                            <Product/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default ProductDetailShimmer;