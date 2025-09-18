import {
  BellOutlined,
  AreaChartOutlined,
  DragOutlined,
  PieChartOutlined,
  AlignCenterOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    path: "/dashboard",
    icon: <AreaChartOutlined />,
    label: "仪表盘",
  },
  { key: "2", path: "/about", icon: <DragOutlined />, label: "关于我们" },
  {
    key: "3",
    icon: <BellOutlined />,
    label: "告警管理",
    children: [
      { key: "3-1", path: "/alertRule", label: "告警规则" },
      { key: "3-2", path: "/alertTemplate", label: "规则模版" },
    ],
  },
  {
    key: "4",
    path: "/dataSource",
    icon: <PieChartOutlined />,
    label: "数据源",
  },
  {
    key: "5",
    icon: <AlignCenterOutlined />,
    label: "故障管理",
    children: [{ key: "5-1", path: "/faultCenter", label: "故障中心" }],
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: "系统管理",
    children: [
      { key: "6-1", path: "/user", label: "用户管理" },
      { key: "6-2", path: "/role", label: "角色管理" },
    ],
  },
];
