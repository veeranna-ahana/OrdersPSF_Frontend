/** @format */

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import FirstNestMenu from "./FirstNestMenu";

const SidebarLink = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	list-style: none;
	height: 35px;
	text-decoration: none;
	font-size: 13px;
	&:hover {
		border-left: 4px solid #263159;
		cursor: pointer;
		color: #ffffff;
	}
`;

const SidebarLabel = styled.span`
	margin-left: 8px;
`;

const ActiveLinkStyle = {
	color: "white",
	// background: "rgba(111, 115, 126, 0.3)",
	background: "#263159",
	textdecoration: "none",
};

const SubNavComp = ({ item, sidebar }) => {
	const [subnav, setSubnav] = useState(false);
	const [clickedPreviousMenu, setClickedPreviousMenu] = useState(false);
	const location = useLocation();

	const showSubnav = () => setSubnav(!subnav);

	useEffect(() => {
		// Disable active style if navigating away from "Previous Menu"
		if (location.pathname !== "/salesHome") {
			setClickedPreviousMenu(false);
		}
	}, [location]);
	const previousMenuUrl = process.env.REACT_APP_PREVIOUS_MENU_URL;
	// console.log("previousMenuUrl", previousMenuUrl);
	const handlePreviousMenuClick = () => {
		setClickedPreviousMenu(true);
		// window.location.href = "http://172.16.20.61:3000/salesHome";
		window.location.href = previousMenuUrl;
	};

	return (
		<>
			<NavLink
				className={({ isActive }) =>
					isActive && item.path && !subnav ? "active-link-url" : "link-default"
				}
				to={item.title === "Previous Menu" ? undefined : item.path}
				onClick={
					item.title === "Previous Menu" ? handlePreviousMenuClick : undefined
				}
				style={item.title === "Previous Menu" ? ActiveLinkStyle : {}}>
				<SidebarLink onClick={item.subNav && showSubnav}>
					<div className="side-nav-main-container">
						<div className="side-nav-main-icon">{item.icon} </div>
						<SidebarLabel className="side-nav-main-title">
							{item.title}
						</SidebarLabel>
					</div>
					<div>
						{item.subNav && subnav
							? item.iconOpened
							: item.subNav
							? item.iconClosed
							: null}
					</div>
				</SidebarLink>
			</NavLink>

			{subnav &&
				item?.subNav.map((subNav1, index) => {
					return (
						<FirstNestMenu
							key={index}
							subNav1={subNav1}
							subnav={subnav}
						/>
					);
				})}
		</>
	);
};

export default SubNavComp;
