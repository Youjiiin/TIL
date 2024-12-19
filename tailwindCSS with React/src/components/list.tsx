import image from "../assets/char.svg";
import priceTag from "../assets/price.svg";
import map from "../assets/map.svg";
import pack from "../assets/pack.svg";
import bookmark from "../assets/like0.svg";
import time from "../assets/time.svg";

interface ListProps {
  title: string;
  type: "together" | "sell";
  total: number;
  remain: number;
  location: string;
  due?: string;
  price?: number;
  date: string;
  like: number;
  comments: number;
}

export const List = ({
  title,
  type,
  total,
  remain,
  location,
  due,
  price,
  date,
  like,
  comments,
}: ListProps) => {
  return (
    <div className="text-text flex flex-col rounded-custom px-[19px] py-[13px] shadow-md">
      <div className="flex justify-between mb-[15px]">
        <p className="text-text font-semibold text-[14px]">{title}</p>
        <p className="text-subText text-[13px]">{date}</p>
      </div>

      <div className="flex">
        <img src={image} className="mr-[22px] w-[90px] h-[90px]" />

        <div className="flex flex-col gap-[12px]">
          <div className="flex gap-[10px] border-l-2 px-[10px]">
            <img src={pack} />
            <p className="text-[13px]">
              <strong className="text-main">{remain}</strong> / {total}
            </p>
          </div>

          <div className="flex gap-[10px] border-l-2 px-[10px]">
            <img src={map} />
            <p className="text-[13px]">{location}</p>
          </div>

          {type === "together" ? (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={time} />
              <p className="text-[13px]">
                <strong className="text-main">{due}</strong> 까지 모집
              </p>
            </div>
          ) : (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={priceTag} />
              <p className="text-[13px]">{price}원</p>
            </div>
          )}
        </div>
        {type === "together" ? (
          <p className="rounded-[4px] bg-sub py-[4px] px-[12px] text-second h-[24px] flex justify-center items-center text-[12px] ml-auto">
            같이사요
          </p>
        ) : (
          <p className="rounded-[4px] bg-sub py-[4px] px-[12px] text-second h-[24px] flex justify-center items-center text-[12px] ml-auto">
            팔아요
          </p>
        )}
      </div>

      <div className="flex gap-[10px] mt-[17px] pt-[12px] border-t text-subText">
        <img src={bookmark} />
        <p className="text-subText text-[13px]">관심 {like}</p>
        <p className="text-subText text-[13px]">댓글 {comments}</p>
      </div>
    </div>
  );
};
