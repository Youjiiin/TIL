import image from "../assets/char.svg";
import price from "../assets/price.svg";
import map from "../assets/map.svg";
import pack from "../assets/pack.svg";
import like from "../assets/like0.svg";

export const List = () => {
  return (
    <div className="text-text flex flex-col rounded-md px-4 py-3 shadow-md">
      <div className="flex justify-between mb-3">
        <p className="text-text">포도 두 송이 남는데 구매하실 분~</p>
        <p className="text-subText">12.17</p>
      </div>

      <div className="flex">
        <img src={image} className="mr-4"/>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 border-l-2 px-2">
            <img src={price} />
            <p>3000원</p>
          </div>
          <div className="flex gap-2 border-l-2 px-2">
            <img src={map} />
            <p>경기도 부천</p>
          </div>
          <div className="flex gap-2 border-l-2 px-2">
            <img src={pack} />
            <p>2 / 10</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5 pt-2.5 border-t text-subText">
        <img src={like} />
        <p>관심 7</p>
        <p>댓글 10</p>
      </div>
    </div>
  );
};
