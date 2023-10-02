import { useEffect, useState } from 'react';
import ProjectSearchForm from '../../components/Forms/ProjectSearchForm';
import ProjectCard from '../../components/common/ProjectCard';
import { motion } from 'framer-motion';
import customerHero from '../../assets/images/customer/customer-hero.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { searchProject } from '../../api/common.api';
import { Button, CircularProgress, Container, Grid } from '@mui/material';
import { ApiError } from '../../api/api.helpers';
import ApiErrorHandler from '../../components/common/ApiError';
import { ProjectSearchFormSchemaType } from '../../validation/project.validation';
import { Link } from 'react-router-dom';

const CustomerPage = () => {
  const [searchResults, setSearchResults] = useState<any>();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [searchData, setSearchData] = useState<
    ProjectSearchFormSchemaType | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState<ApiError | null>(null);

  const fetchSearchResults = async () => {
    const { error, data } = await searchProject(page, perPage, searchData);
    if (data.results) {
      setSearchResults(data);
      setLoading(false);
    }
    if (error) {
      setError(error);
    }
  };

  const handleSubmit = async (searchData: ProjectSearchFormSchemaType) => {
    setSearchData(searchData);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [page, searchData]);

  const handlePageChange = (page: any) => {
    setPage(page);
  };
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        delayChildren: 0.8,
      },
    },
    hover: {
      scale: 1.2,
    },
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        when: 'afterChildren',
      },
    },
  };
  return (
    <div className="b-grey-light">
      {err && <ApiErrorHandler error={err} />}
      <div className="customer-hero w-full h-screen relative flex flex-col z-20">
        <Navbar className=" w-full z-20" />
        <div className=" absolute z-[-1] top-0 left-0 w-full h-full">
          <img
            className="  w-full h-full object-cover"
            src={customerHero}
            alt=""
          />
        </div>

        <div className="flex justify-center items-center text-white h-full mb-20 ">
          <span className="hero-text-center">
            Your perfect home from miles away
          </span>
        </div>
      </div>

      <Container
        className=" w-full  mb-16 mt-16
        "
      >
        <Grid alignItems={'stretch'}>
          <ProjectSearchForm onFormSubmit={handleSubmit} />
        </Grid>
      </Container>
      <Container>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress className="self-center w-fit mx-auto " />
          </div>
        ) : (
          <div className="">
            <Grid container columnGap={5} rowGap={3}>
              {searchResults?.results &&
                searchResults.results.map((p: any) => (
                  <motion.div
                    key={p._id}
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                  >
                    <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
                      <Link to={`/customer/project/${p._id}`}>
                        <ProjectCard project={p} />
                      </Link>
                    </Grid>
                  </motion.div>
                ))}
            </Grid>
            <div className="flex justify-center  gap-10 mt-10">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={searchResults.isNextable ? false : true}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Container>

      <motion.div className="flex flex-wrap gap-5 p-20"></motion.div>
      <Footer />
    </div>
  );
};

export default CustomerPage;
