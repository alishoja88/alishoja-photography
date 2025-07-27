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
   <div className="w-full sm:w-[95%] md:w-[90%] mx-auto mb-8 sm:mb-12 md:mb-16">
     <article>
       <HomePage />
     </article>
   </div>
 );
}