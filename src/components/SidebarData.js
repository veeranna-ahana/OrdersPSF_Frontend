/** @format */

import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { BsPersonFill, BsFillGearFill, BsScrewdriver } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { DiOpenshift } from "react-icons/di";
import { MdReport } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { BiGitMerge } from "react-icons/bi";
import { SiGoogletagmanager, SiRedhatopenshift } from "react-icons/si";
import { BsServer } from "react-icons/bs";
import { FiCpu } from "react-icons/fi";
import { VscServerProcess } from "react-icons/vsc";
import { FiGitPullRequest } from "react-icons/fi";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaDropbox } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { AiOutlineSchedule } from "react-icons/ai";
import { GiLaserPrecision } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { AiFillSchedule } from "react-icons/ai";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://172.16.20.61:3000";

console.log("123", BASE_URL);

export const ordersSidebar = [
	{
		title: "Profile",
		icon: <FiCpu />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "New Order",
				path: "/Orders/Profile/NewOrder",
				icon: <BsServer />,
			},
			{
				title: "Find Order",
				path: "/Orders/Profile/FindOrder",
				icon: <VscServerProcess />,
			},
			{
				title: "Find Schedule",
				path: "/Orders/Profile/FindScheduleForm",
				icon: <VscServerProcess />,
			},
			{
				title: "Order List",
				icon: <FiCpu />,
				iconClosed: <RiIcons.RiArrowDownSFill />,
				iconOpened: <RiIcons.RiArrowUpSFill />,
				subNav: [
					{
						title: "Created",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Created",
					},
					{
						title: "Recorded",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Recorded",
					},
					{
						title: "Processing",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Processing",
					},
					{
						title: "Completed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Completed",
					},
					{
						title: "Produced",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Produced",
					},
					{
						title: "Packed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Packed",
					},
					{
						title: "Dispatched",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/Dispatched",
					},
					{
						title: "All",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/OrderList/All",
					},
				],
			},
			{
				title: "Fixtures Order List",
				icon: <FiCpu />,
				iconClosed: <RiIcons.RiArrowDownSFill />,
				iconOpened: <RiIcons.RiArrowUpSFill />,
				subNav: [
					{
						title: "Recorded",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/FixturesOrderList/Recorded",
					},
					{
						title: "Processing",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/FixturesOrderList/Processing",
					},
					{
						title: "Completed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/FixturesOrderList/Completed",
					},
					{
						title: "Ready",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/FixturesOrderList/Ready",
					},
					{
						title: "Handed Over",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Profile/FixturesOrderList/HandedOver",
					},
				],
			},
			{
				title: "Internal Order List",
				icon: <FiCpu />,
				iconClosed: <RiIcons.RiArrowDownSFill />,
				iconOpened: <RiIcons.RiArrowUpSFill />,
				subNav: [
					{
						title: "Recorded",
						path: "/Orders/Profile/InternalOrderList/Recorded",
					},
					{
						title: "Processing",
						path: "/Orders/Profile/InternalOrderList/Processing",
					},
					{
						title: "Completed",
						path: "/Orders/Profile/InternalOrderList/Completed",
					},
					{
						title: "Ready",
						path: "/Orders/Profile/InternalOrderList/Ready",
					},
					{
						title: "Handed Over",
						path: "/Orders/Profile/InternalOrderList/HandedOver",
					},
				],
			},
			// {
			//   title: "Print Lable",
			//   // path: "/production/setup/process",
			//   icon: <VscServerProcess />,
			// },
		],
	},

	// {
	// 	title: "Combined Schedules",
	// 	icon: <AiFillCreditCard />,
	// 	iconClosed: <RiIcons.RiArrowDownSFill />,
	// 	iconOpened: <RiIcons.RiArrowUpSFill />,

	// 	subNav: [
	// 		{
	// 			title: "Job Work",
	// 			icon: <VscTypeHierarchySub />,
	// 			subNav: [
	// 				{
	// 					title: "Create",
	// 					path: "/Orders/CombinedSchedules/JobWork/Create",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 				},

	// 				{
	// 					title: "Open",
	// 					path: "/Orders/CombinedSchedules/JobWork/Open",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 				},

	// 				{
	// 					title: "SheduleList",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 					subNav: [
	// 						{
	// 							title: "Order",
	// 							path: "/Orders/CombinedSchedules/JobWork/ScheduleList/Order",
	// 							icon: <AiIcons.AiOutlineArrowRight />,
	// 						},

	// 						{
	// 							title: "Closed",
	// 							path: "/Orders/CombinedSchedules/JobWork/ScheduleList/Closed",
	// 							icon: <AiIcons.AiOutlineArrowRight />,
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},

	// 		{
	// 			title: "Sales",
	// 			icon: <VscTypeHierarchySub />,
	// 			subNav: [
	// 				{
	// 					title: "Create",
	// 					path: "/Orders/CombinedSchedules/Sales/Create",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 				},

	// 				{
	// 					title: "Open",
	// 					path: "/Orders/CombinedSchedules/Sales/Open",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 				},
	// 				{
	// 					title: "SheduleList",
	// 					icon: <AiIcons.AiOutlineArrowRight />,
	// 					subNav: [
	// 						{
	// 							title: "Order",
	// 							path: "/Orders/CombinedSchedules/Sales/ScheduleList/Order",
	// 							icon: <AiIcons.AiOutlineArrowRight />,
	// 						},
	// 						{
	// 							title: "Closed",
	// 							path: "/Orders/CombinedSchedules/Sales/ScheduleList/Closed",
	// 							icon: <AiIcons.AiOutlineArrowRight />,
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	{
		title: "Combined Schedule",
		icon: <SiRedhatopenshift />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "Job Work",
				path: "/Orders/JobWork",
				icon: <BsServer />,
				subNav: [
					{
						title: "Create",
						path: "/Orders/JobWork/CREATE",
						icon: <AiIcons.AiOutlineArrowRight />,
					},
					// {
					//   title: "Open",
					//   path: "/Orders/JobWork/OPEN",
					//   icon: <AiIcons.AiOutlineArrowRight />,
					// },
					{
						title: "ScheduleList",
						// path: "/Orders/JobWork/ScheduleList",
						icon: <AiIcons.AiOutlineArrowRight />,
						subNav: [
							{
								title: "Order",
								path: "/Orders/JobWork/ScheduleList/ORDER",
								icon: <AiIcons.AiOutlineArrowRight />,
							},
							{
								title: "Closed",
								path: "/Orders/JobWork/ScheduleList/Closed",
								icon: <AiIcons.AiOutlineArrowRight />,
							},
						],
					},
				],
			},
			{
				title: "Sales",
				path: "/Orders/Sales",
				icon: <VscServerProcess />,
				subNav: [
					{
						title: "Create",
						path: "/Orders/Sales/Create",
						icon: <AiIcons.AiOutlineArrowRight />,
					},
					// {
					//   title: "Open",
					//   path: "/Orders/Sales/Open",
					//   icon: <AiIcons.AiOutlineArrowRight />,
					// },
					{
						title: "ScheduleList",
						// path: "/Orders/Sales/ScheduleList",
						icon: <AiIcons.AiOutlineArrowRight />,
						subNav: [
							{
								title: "Order",
								path: "/Orders/Sales/ScheduleList/Order",
								icon: <AiIcons.AiOutlineArrowRight />,
							},
							{
								title: "Closed",
								path: "/Orders/Sales/ScheduleList/Closed",
								icon: <AiIcons.AiOutlineArrowRight />,
							},
						],
					},
				],
			},
		],
	},

	{
		title: "Fabrication",
		icon: <FaDropbox />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "New Order",
				path: "/Orders/Fabrication/NewOrder",
				icon: <BsServer />,
			},

			{
				title: "Find Order",
				path: "/Orders/Fabrication/FindOrder",
				icon: <BsServer />,
			},

			{
				title: "Order List",
				icon: <FiCpu />,
				iconClosed: <RiIcons.RiArrowDownSFill />,
				iconOpened: <RiIcons.RiArrowUpSFill />,
				subNav: [
					{
						title: "Created",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Created",
					},

					{
						title: "Recorded",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Recorded",
					},
					{
						title: "Processing",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Processing",
					},
					{
						title: "Completed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Completed",
					},
					{
						title: "Produced",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Produced",
					},
					{
						title: "Packed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Packed",
					},
					{
						title: "Dispatched",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/Dispatched",
					},

					{
						title: "All",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Fabrication/OrderList/All",
					},
				],
			},
		],
	},
	{
		title: "Service",
		icon: <MdHomeRepairService />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "New Order",
				path: "/Orders/Service/NewOrder",
				icon: <BsServer />,
			},

			{
				title: "Find Order",
				path: "/Orders/Service/FindOrder",
				icon: <BsServer />,
			},

			{
				title: "Order List",
				icon: <FiCpu />,
				iconClosed: <RiIcons.RiArrowDownSFill />,
				iconOpened: <RiIcons.RiArrowUpSFill />,
				subNav: [
					{
						title: "Created",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Created",
					},

					{
						title: "Recorded",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Recorded",
					},
					{
						title: "Completed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Completed",
					},
					{
						title: "Processing",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Processing",
					},
					{
						title: "Produced",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Produced",
					},
					{
						title: "Packed",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Packed",
					},
					{
						title: "Dispatched",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/Dispatched",
					},

					{
						title: "All",
						icon: <AiIcons.AiOutlineArrowRight />,
						path: "/Orders/Service/OrderList/All",
					},
				],
			},
		],
	},

	// {
	// 	title: "Previous Menu 123",
	// 	path: "#", // Dummy value as we'll handle navigation manually
	// 	icon: <MdIcon.MdPreview />,
	// 	iconClosed: <RiIcons.RiArrowDownSFill />,
	// 	iconOpened: <RiIcons.RiArrowUpSFill />,
	// 	onClick: () => {
	// 		console.log("Navigating to Sales Home");
	// 		window.location.href = "http://172.16.20.61:3000/salesHome";
	// 	},
	// },

	{
		title: "Previous Menu",
		path: "/",
		// path: "http://172.16.20.61:3000/home",
		path: "http://192.168.1.25:9000/home",
		icon: <MdIcon.MdPreview />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
	},
];

export const adminSidebar = [
	{
		title: "Access",
		icon: <MdIcon.MdOutlineSecurity />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "Menu Roles",
				path: "/admin/menuRoles",
				icon: <AiIcons.AiOutlineMenuFold />,
			},
		],
	},
	{
		title: "Users",
		icon: <FaIcon.FaUsers />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,
		subNav: [
			{
				title: "Roles",
				path: "/admin/roles",
				icon: <VscTypeHierarchySub />,
			},
			{
				title: "Menus",
				path: "/admin/menus",
				icon: <BiFoodMenu />,
			},
			{
				title: "Users",
				path: "/admin/users",
				icon: <HiUsers />,
			},
		],
	},
];
