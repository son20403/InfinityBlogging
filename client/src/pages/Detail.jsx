import React from 'react';
import BlogItem from '../components/post-item/BlogItem';
import CategoryItem from '../components/post-item/CategoryItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import { useParams } from 'react-router-dom';
import useGetDetailPost from '../hooks/useGetDetailPost';
const Detail = () => {
    const { id } = useParams();
    const { dataDetailPost } = useGetDetailPost(id || 'asd')
    return (
        <div className='page-container my-10 '>
            <div className='grid grid-cols-3 gap-10'>
                <div className='col-span-2'>
                    <BlogItem isSingle isDetail data={dataDetailPost}></BlogItem>
                    <div className='content mt-10'>
                        <div dangerouslySetInnerHTML={{ __html: dataDetailPost?.content }} />
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'> Search</h1>
                        <form className='w-full relative my-10'>
                            <input type="text"
                                className='w-full py-3 px-5 outline-none border rounded-lg
                            focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]' placeholder='search...' />
                            <button
                                className='absolute right-5 top-1/2 -translate-y-2/4'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </form>
                    </div>
                    <CategoryItem></CategoryItem>
                    <div className='mb-10'>
                        <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'>Bài viết khác</h1>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
// <div className='max-w-[1280px] mx-auto my-16 text-white'>
//     <div className='flex justify-center items-center gap-5 mb-16'>
//         <div className='w-full max-w-[50%] overflow-hidden rounded-lg'>
//             <img src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/4227725_high-gaming-pc-buyer-guide.jpg" alt="" className='w-full h-full object-cover' />
//         </div>
//         <div className='flex flex-col gap-y-5 my-5'>
//             <span
//                 className='rounded-lg max-w-[100px] text-center px-3
//                         text-xs font-semibold py-1 bg-white text-gray-600'>Kiến thức</span>
//             <h1 className='text-2xl font-semibold'>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</h1>
//             <p className='font-light'>Mar 23 - Andiez Le</p>
//         </div>
//     </div>
//     <div className='mb-16'>
//         <h1 className='mb-10 font-semibold text-lg'>Chương 1</h1>
//         <p className='font-extralight text-[14px] leading-7 '>Gastronomy atmosphere set aside. Slice butternut cooking
//             home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce
//             wait roux. slices rosette bone-in simmer precision alongside baby leeks. Crafting renders aromatic enjoyment,
//             then slices taco. Minutes undisturbed cuisine lunch magnificent mustard curry. Juicy share baking sheet pork.
//             Meals ramen rarities selection, raw pastries richness magnificent atmosphere. Sweet soften dinners, cover
//             mustard infused skillet, Skewers on culinary experience.
//             <br />
//             <br />
//             Juicy meatballs brisket slammin baked shoulder. Juicy smoker soy sauce burgers brisket. polenta mustard hunk
//             greens. Wine technique snack skewers chuck excess. Oil heat slowly. slices natural delicious, set aside magic
//             tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines
//             excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw
//             crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.
//             <br />
//             <br />
//             Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low
//             heat plenty of time adobo fat raw soften fruit. sweet renders bone-in marrow richness kitchen, fricassee
//             basted pork shoulder. Delicious butternut squash hunk. Flavor centerpiece plate, delicious ribs bone-in meat,
//             excess chef end. sweet effortlessly pork, low heat smoker soy sauce flavor meat, rice fruit fruit. Romantic
//             fall-off-the-bone butternut chuck rice burgers.</p>
//     </div>
//     <div className='bg-baltic-sea flex rounded-lg justify-between items-center gap-x-5 overflow-hidden mb-16'>
//         <div className=' bg-blue-charcoal w-[250px] h-[250px] overflow-hidden rounded-lg'>
//             <img src="https://images.vexels.com/media/users/3/143597/isolated/lists/0626994ef7a02a13ab0f7912889ece0e-lol-meme-face.png" alt="" className='w-full h-full object-cover' />
//         </div>
//         <div className='flex-1 p-10'>
//             <h1 className=' text-2xl font-semibold mb-7'>Jake Sullivan</h1>
//             <p className='font-extralight text-[14px] leading-7 '>Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will meld. Thick Skewers skillet natural, smoker soy sauce wait roux.  Gastronomy atmosphere set aside. SThick Skewers skillet natural, smoker soy sauce wait roux.  Gastronomy atmosphere set aside. SThick Skewers skillet natural, smoker soy sauce wait roux.  Gastronomy atmosphere set aside. Slice butternut cooking home. </p>
//         </div>
//     </div>

//     <div className='grid grid-cols-4 gap-x-5'>
//         <div>
//             <img src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/4227725_high-gaming-pc-buyer-guide.jpg"
//                 alt="" className='w-full h-[202px] rounded-lg object-cover' />
//             <div className='flex flex-col gap-y-5 my-5'>
//                 <span
//                     className='rounded-lg max-w-[100px] text-center px-3
//                         text-xs font-semibold py-1 bg-white text-gray-600'>Kiến thức</span>
//                 <h1 className='text-base font-semibold'>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</h1>
//                 <p className='font-light'>Mar 23 - Andiez Le</p>
//             </div>
//         </div>
//         <div>
//             <img src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/4227725_high-gaming-pc-buyer-guide.jpg"
//                 alt="" className='w-full h-[202px] rounded-lg object-cover' />
//             <div className='flex flex-col gap-y-5 my-5'>
//                 <span
//                     className='rounded-lg max-w-[100px] text-center px-3
//                         text-xs font-semibold py-1 bg-white text-gray-600'>Kiến thức</span>
//                 <h1 className='text-base font-semibold'>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</h1>
//                 <p className='font-light'>Mar 23 - Andiez Le</p>
//             </div>
//         </div>
//         <div>
//             <img src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/4227725_high-gaming-pc-buyer-guide.jpg"
//                 alt="" className='w-full h-[202px] rounded-lg object-cover' />
//             <div className='flex flex-col gap-y-5 my-5'>
//                 <span
//                     className='rounded-lg max-w-[100px] text-center px-3
//                         text-xs font-semibold py-1 bg-white text-gray-600'>Kiến thức</span>
//                 <h1 className='text-base font-semibold'>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</h1>
//                 <p className='font-light'>Mar 23 - Andiez Le</p>
//             </div>
//         </div>
//         <div>
//             <img src="https://cosmosgroup.sgp1.cdn.digitaloceanspaces.com/news/4227725_high-gaming-pc-buyer-guide.jpg"
//                 alt="" className='w-full h-[202px] rounded-lg object-cover' />
//             <div className='flex flex-col gap-y-5 my-5'>
//                 <span
//                     className='rounded-lg max-w-[100px] text-center px-3
//                         text-xs font-semibold py-1 bg-white text-gray-600'>Kiến thức</span>
//                 <h1 className='text-base font-semibold'>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</h1>
//                 <p className='font-light'>Mar 23 - Andiez Le</p>
//             </div>
//         </div>
//     </div>
// </div>