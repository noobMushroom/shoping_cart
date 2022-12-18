import uuid from 'react-uuid';
export default function Stars(props: { num: number }) {
  let totalStars = Math.floor(props.num);
  let starsArray: number[] = [];
  for (let i = 0; i <= totalStars; i++) {
    starsArray.push(i + 1);
  }

  return (
    <div className="flex items-center">
      {starsArray.map((star) => {
        return (
          <div key={uuid()}>
            <i className="fa-sharp mr-[0.2rem] text-red-600 fa-solid text-lg fa-star"></i>
          </div>
        );
      })}
    </div>
  );
}
