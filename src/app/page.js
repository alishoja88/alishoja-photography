import HomePage from "./home/homePage";

export const metadata = {
 title: 'Ali Shoja | Professional Photography Portfolio',
 description: 'Discover unique perspectives through professional street and nature photography. Explore a collection of captivating moments and visual stories.',
 openGraph: {
   images: [{
     url: './images/nature21.JPEG', 
     width: 1200,
     height: 630,
     alt: 'Ali Shoja Photography Portfolio'
   }]
 }
};

export default function Home() {
 return (
   <div className="w-[90%] mx-auto">
     <article>
       <HomePage />
     </article>
   </div>
 );
}