const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, '..', 'src', 'app', 'calculators');
const categories = ['math', 'financial', 'health', 'other'];

function pascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function processCalculatorFolder(categoryPath, folderName) {
  const folderPath = path.join(categoryPath, folderName);
  const pagePath = path.join(folderPath, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`Skipping ${folderName} - no page.tsx found`);
    return;
  }

  const content = fs.readFileSync(pagePath, 'utf8');

  // Skip if already has metadata export (already updated)
  if (content.includes('export const metadata') && !content.includes('"use client"')) {
    console.log(`Skipping ${folderName} - already has metadata`);
    return;
  }

  // Skip if it's a category page (page.tsx directly in category folder)
  if (folderName === 'page.tsx') {
    return;
  }

  const componentName = pascalCase(folderName);
  const clientComponentPath = path.join(folderPath, `${componentName}.tsx`);

  // Move the existing page.tsx content to a client component file
  const clientContent = content;

  // Create new page.tsx with metadata
  const newPageContent = `import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ${componentName} from "./${componentName}";

export const metadata: Metadata = generateCalculatorMetadata("${folderName}");

export default function ${componentName}Page() {
  return <${componentName} />;
}
`;

  // Update the client component - change the export name
  let updatedClientContent = clientContent;

  // Change the default export function name
  const exportRegex = /export default function \w+\(/;
  updatedClientContent = updatedClientContent.replace(exportRegex, `export default function ${componentName}(`);

  // Write the files
  fs.writeFileSync(clientComponentPath, updatedClientContent);
  fs.writeFileSync(pagePath, newPageContent);

  console.log(`Updated ${folderName}`);
}

// Process all categories
categories.forEach(category => {
  const categoryPath = path.join(calculatorsDir, category);

  if (!fs.existsSync(categoryPath)) {
    console.log(`Category ${category} not found`);
    return;
  }

  const items = fs.readdirSync(categoryPath);

  items.forEach(item => {
    const itemPath = path.join(categoryPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      processCalculatorFolder(categoryPath, item);
    }
  });
});

console.log('Done!');
