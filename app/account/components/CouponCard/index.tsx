import Button from "@/components/Button";
import Card from "@/components/Card";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";

const CouponCard = () => {
  return (
    <Card wrapperClass="border !border-gray-300">
      <div className="flex items-center justify-between">
        <span className="text-sm rounded-md flex gap-1 whitespace-nowrap items-center capitalize">
          {faker.lorem.words(
            faker.number.int({
              min: 2,
              max: 4,
            })
          )}
        </span>
        <span className="text-xs text-orange-500 p-2 bg-orange-100 rounded-md leading-none whitespace-nowrap">
          ⚠️ Son{" "}
          {format(
            faker.date.between({
              from: new Date(),
              to: new Date(new Date().setDate(new Date().getDate() + 30)),
            }),
            "d"
          )}{" "}
          gün
        </span>
      </div>
      <div className="flex items-center mt-2">
        <p className="text-xs text-gray-500 w-1/2 whitespace-pre-line">
          {faker.lorem.sentence({
            max: 10,
            min: 5,
          })}
        </p>
        <div
          // divider
          className="border-r border-gray-300 h-14 mx-2"
        />
        <div className="w-1/2 flex">
          <div className="w-full h-full flex items-center justify-between my-auto">
            <h4 className="text-xl font-semibold text-orange-500">
              {faker.number.int({
                min: 5,
                max: 50,
              })}
              %
            </h4>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              className="text-xs"
            >
              Kullan
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
