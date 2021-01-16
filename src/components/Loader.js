
import ProfileCard from './ProfileCard';


const LoadingSkeleton = () => {
  const skeletonCards = [1, 2, 3, 4, 5].map(key => <ProfileCard key={key} />)
  return (
    <>
      {skeletonCards}
    </>
  )
}

export default LoadingSkeleton;