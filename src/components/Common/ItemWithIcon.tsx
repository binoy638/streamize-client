import { Text } from '@mantine/core';
import React from 'react';

interface ItemWithIconProps {
  icon: React.ReactNode;
  title: string;
}

const ItemWithIcon = ({ icon, title }: ItemWithIconProps) => {
  return (
    <div className="flex gap-1 ">
      {icon}
      <Text size="xs"> {title} </Text>
    </div>
  );
};

export default ItemWithIcon;
