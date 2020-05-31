import React, { Fragment, useEffect, useState } from 'react';

import fetchData from '../api/index';
import Loader from './Loader';

//Reactstrap Component
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';

//Thirdparty Packages
import Moment from 'react-moment';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feeds = (props) => {

	const [allfeeds, setAllFeeds] = useState();
	const [feeds, setFeeds] = useState();
	const [loading, setLoading] = useState(true);
	const [collapse, setCollapse] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [pagesize, setPagesize] = useState(15);
	const [totalpages, setTotalpages] = useState(0);

	useEffect(() => {

		const fetchAPI = () => {
			fetchData().then((res) => {
				setAllFeeds(res);				
				let curpage = currentPage;
				let feeds = res.slice( 0, (curpage + 1) * pagesize );
				setFeeds(feeds);
				setTotalpages( Math.ceil(res.length / pagesize) );
				setLoading(false);	
			})
		};

		fetchAPI();

	}, []);

	const loadmoreItems = () => {
		if ( currentPage + 1 < totalpages ) {
			let curpage = currentPage < totalpages ? currentPage + 1 : currentPage;
			setCurrentPage(curpage);

			let feeds = allfeeds.slice( 0, (curpage + 1) * pagesize);
			setFeeds(feeds);
		} else {
			setHasMore(false);
		}
	}

	const toggle = (e) => {		
		let event = e.target.dataset.event;
		setCollapse(Number(event));
	}

	const scrollhandle = () => {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		var clientHeight = document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
	  
		if (scrolledToBottom) {
		   setTimeout(loadmoreItems(), 2000);
		}
	}	

	return (
		<Fragment>		
			{
				!loading ?
				(	
					<InfiniteScroll
						dataLength={pagesize}
						pageStart={0}
						onScroll={() => scrollhandle()}
						hasMore={hasMore}
						loader={
							<div style={{textAlign: 'center'}}>
								<h2>Loading...</h2>
							</div>
						}
						endMessage={
							<p style={{textAlign: 'center'}}>
								<b>Yay! You have seen it all</b>
							</p>
						}
					>
						{feeds.map((feed, index) => {
							return (
								<Card style={{ marginBottom: '1rem' }} key={index}>
									<CardHeader onClick={(e) => toggle(e)} data-event={index} style={{ cursor: 'pointer' }}>{feed.title}</CardHeader>
									<Collapse isOpen={collapse === index}>
										<CardBody>
											<p>{feed.contentSnippet}</p>
											<div className="d-flex justify-content-between">
												<span>Published on: <Moment format="Do MMM YYYY">{feed.isoDate}</Moment></span>
												<a href={feed.link} target="_blank" rel="noopener noreferrer">Read More</a>
											</div>											
										</CardBody>
									</Collapse>
								</Card>
							)
						})}
					</InfiniteScroll>
				) : <Loader />
			}
		</Fragment>
	)
}

export default Feeds;
