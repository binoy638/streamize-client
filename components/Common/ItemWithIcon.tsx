import { Text } from '@mantine/core';
import React, { FC } from 'react';

interface ItemWithIconProps {
  icon: React.ReactNode;
  title: string;
}

const ItemWithIcon: FC<ItemWithIconProps> = ({ icon, title }) => {
  return (
    <div className="flex gap-1  items-center">
      {icon}
      <Text size="sm"> {title} </Text>
    </div>
  );
};

export default ItemWithIcon;
