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
        <div className="px-5 flex-col bg-white rounded-2xl pt-5 shadow-2xl  w-full h-100">
            <p className="mb-3 font-bold text-2xl ">อาคาร</p>
            <Menu
                dismiss={{
                itemPress: false,
                }}
                
                >
                <MenuHandler  style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(public/sitback.png)',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }} className="mb-3 w-full h-25 text-2xl cursor-pointer">
                <Button >SIT Building
                </Button>
                </MenuHandler>
                <MenuList className="w-65">
                <MenuItem className="p-0">
                    <label
                    htmlFor="1st Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="1st Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    1st Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="3st Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="3st Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    3st Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="4st Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="4st Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    4st Floor
                    </label>
                </MenuItem>
                </MenuList>
            </Menu>
            <br/>
            
            <Menu dismiss={{
                itemPress: false,
                }}>
                <MenuHandler style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(public/Lx_2.jpg',backgroundSize:"cover",backgroundRepeat: "no-repeat",backgroundPosition: "center  "}} className="mb-3 w-full  text-2xl cursor-pointer h-25 ">
                <Button>LX
                </Button>
                </MenuHandler>
                <MenuList className="w-65">
                <MenuItem className="p-0">
                    <label
                    htmlFor="1st Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="1st Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    11 Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="12 Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="12 Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    12 Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="11A Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="11A Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    11A Floor
                    </label>
                </MenuItem>
                </MenuList>
            </Menu>

            <br/>

            <Menu dismiss={{
                itemPress: false,
                }}>
                <MenuHandler style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(public/cb2.jpg',backgroundSize:"cover",backgroundRepeat: "no-repeat",backgroundPosition: "center 70% "}} className="mb-3 w-full h-25  text-2xl cursor-pointer">
                <Button>CB2
                </Button>
                </MenuHandler>
                <MenuList className="w-65">
                <MenuItem className="p-0 ">
                    <label
                    htmlFor="1st Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="1st Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    11 Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="12 Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="12 Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    12 Floor
                    </label>
                </MenuItem>
                <MenuItem className="p-0">
                    <label
                    htmlFor="11A Floor"
                    className="flex cursor-pointer items-center gap-2 p-2"
                    >
                    <Checkbox
                        ripple={false}
                        id="11A Floor"
                        containerProps={{ className: "p-0" }}
                        className="hover:before:content-none"
                    />
                    11A Floor
                    </label>
                </MenuItem>
                </MenuList>
            </Menu>
        </div>
            
        </>
      
    );
  }