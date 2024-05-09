import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReviewStar = (stars) => {
  let temp = [];
  for(let i = 1; i < 11; i++){
    if(i % 2 === 0 && i <=  stars){
      temp.push(<FontAwesomeIcon icon="fa-solid fa-star" />)
    }

    if(i % 2 !== 0 && i ===  stars){
      temp.push(<FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />)
    }

    if(i % 2 === 0 && i > stars && temp.length < 5){
      temp.push(<FontAwesomeIcon icon="fa-regular fa-star" />)
    }
  }
  
  return (
    <>
      {temp}
    </>
  )
}

export default ReviewStar