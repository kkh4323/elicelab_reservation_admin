// import images
import img1 from "../../assets/images/small/img-7.jpg";
import img2 from "../../assets/images/small/img-4.jpg";
import img3 from "../../assets/images/small/img-6.jpg";

const categoriesData = [
    {
        id: 1,
        text: "공지",
        icon: "mdi mdi-chevron-right"
    },
    {
        id: 2,
        text: "행사안내",
        icon: "mdi mdi-chevron-right",
        badge: {
            text: "04",
            color: "badge-soft-success"
        }
    },
    {
        id: 3,
        text: "행사후기",
        icon: "mdi mdi-chevron-right"
    },
    {
        id: 4,
        text: "광고",
        icon: "mdi mdi-chevron-right"
    }
]

const archiveData = [
    {
        id: 1,
        year: "2024",
        badgeCount: "03"
    },
    {
        id: 2,
        year: "2023",
        badgeCount: "06"
    },
    {
        id: 3,
        year: "2022",
        badgeCount: "05"
    }
]
const popularPosts = [
    {
        id: 1,
        imageSrc: img1,
        title: "Beautiful Day with Friends",
        date: "10 Apr, 2020"
    },
    {
        id: 2,
        imageSrc: img2,
        title: "Drawing a sketch",
        date: "24 Mar, 2020"
    },
    {
        id: 3,
        imageSrc: img3,
        title: "Project discussion with team",
        date: "11 Mar, 2020"
    }
]

const tagsData = [
    { id: 1, name: "공지" },
    { id: 2, name: "행사안내" },
    { id: 3, name: "Business" },
    { id: 4, name: "Project" },
    { id: 5, name: "Travel" },
    { id: 6, name: "Lifestyle" },
    { id: 7, name: "Photography" },
]


export { categoriesData, archiveData, popularPosts,tagsData }
