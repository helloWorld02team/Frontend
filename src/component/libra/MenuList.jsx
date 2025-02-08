import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";

export function MenuWithCheckbox() {
  return (
    <>
      <div className="px-9 flex-col bg-white rounded-xl pt-5 shadow-2xl w-full h-full">
        <p className="mb-3 font-bold text-3xl py-2">อาคาร</p>
        <Menu
          dismiss={{
            itemPress: false,
          }}
        >
          <MenuHandler
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(/sit_building.png)", // ใช้คอมม่าแยก
              backgroundSize: "180%", // ขยายขนาดพื้นหลัง
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="mb-5 w-full p-5 text-3xl cursor-pointer text-left rounded-xl shadow-lg"
          >
            <Button>SIT Building</Button>
          </MenuHandler>
          <MenuList className="w-65">
            <MenuItem className="p-0">
              <label
                htmlFor="SIT1"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="SIT1"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                1st Floor
              </label>
            </MenuItem>
            <MenuItem className="p-0">
              <label
                htmlFor="SIT3"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="SIT3"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                3rd Floor
              </label>
            </MenuItem>
            <MenuItem className="p-0">
              <label
                htmlFor="SIT4"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="SIT4"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                4th Floor
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
        <br />

        <Menu
          dismiss={{
            itemPress: false,
          }}
        >
          <MenuHandler
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(/lx_1.jpg",
              backgroundSize: "150%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="mb-5 w-full p-5 text-3xl cursor-pointer text-left rounded-xl shadow-lg"
          >
            <Button>LX</Button>
          </MenuHandler>
          <MenuList className="w-65">
            <MenuItem className="p-0">
              <label
                htmlFor="LX10"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="LX10"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                10th Floor
              </label>
            </MenuItem>
            <MenuItem className="p-0">
              <label
                htmlFor="LX11"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="LX11"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                11th Floor
              </label>
            </MenuItem>
            <MenuItem className="p-0">
              <label
                htmlFor="LX12"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="LX12"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                12th Floor
              </label>
            </MenuItem>
          </MenuList>
        </Menu>

        <br />

        <Menu
          dismiss={{
            itemPress: false,
          }}
        >
          <MenuHandler
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(public/cb2.jpg",
              backgroundSize: "150%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 70% ",
            }}
            className="mb-5 w-full p-5 text-3xl cursor-pointer text-left rounded-xl shadow-lg"
          >
            <Button>CB2</Button>
          </MenuHandler>
          <MenuList className="w-65">
            <MenuItem className="p-0 ">
              <label
                htmlFor="CB23"
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id="CB23"
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                3rd Floor
              </label>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
}
