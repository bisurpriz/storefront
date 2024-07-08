const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");

// components/svgs has svgs that we want to convert to React components and write to components/Icons
const svgsDir = path.resolve(__dirname, "./components/svgs");
const iconsDir = path.resolve(__dirname, "./components/Icons");

const svgs = fs.readdirSync(svgsDir);

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

svgs.forEach(async (svg) => {
  const svgPath = path.resolve(svgsDir, svg);
  const svgContent = fs.readFileSync(svgPath, "utf-8");
  const iconName = svg.replace(/\.svg$/, "");
  const iconPath = path.resolve(iconsDir, `${iconName}.tsx`);
  const code = await transform(
    svgContent,
    {
      plugins: [
        "@svgr/plugin-svgo",
        "@svgr/plugin-jsx",
        "@svgr/plugin-prettier",
      ],
    },
    {
      componentName: iconName,
    }
  );

  fs.writeFileSync(iconPath, code);
});
