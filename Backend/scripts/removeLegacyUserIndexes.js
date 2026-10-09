import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from '../src/models/user.js';

// Old schema versions made username/name unique. Only email is unique now.
// Preview by default; use --apply to remove these two obsolete constraints.
try {
  await mongoose.connect(process.env.MONGODB_URI);
  const indexes = await User.collection.indexes();
  for (const index of indexes) {
    const fields = Object.keys(index.key);
    if (index.unique && fields.length === 1 && ['username', 'name'].includes(fields[0])) {
      if (process.argv.includes('--apply')) {
        await User.collection.dropIndex(index.name);
        console.log(`Removed obsolete index: ${index.name}`);
      } else {
        console.log(`Obsolete index: ${index.name}. Run with --apply to remove it.`);
      }
    }
  }
  await User.init();
} catch (error) {
  console.error('User index migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
