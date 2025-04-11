import MyAccountCard from "./MyAccountCard";
import MyAccountItems from "./MyAccountItems";
MyAccountItems
MyAccountCard

type AccountModalType = typeof MyAccountCard & {
  Body: typeof MyAccountCard;
  Items: typeof MyAccountItems;
};

const AccountModal = MyAccountCard as AccountModalType;

AccountModal.Body = MyAccountCard;
AccountModal.Items = MyAccountItems;

export default AccountModal;
