import "./Header.css"
import ReactImg from "../assets/react-core-concepts.png";

const Titles = ['Fundamental', 'Core', 'Crucial'];

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default function Header(){
    return (
        <header>
            <img src={ReactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {Titles[getRandomInt(2)]} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}