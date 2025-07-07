import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Loading = ({ className, type = 'cards' }) => {
  const shimmerVariants = {
    initial: { backgroundPosition: '-200px 0' },
    animate: { 
      backgroundPosition: '200px 0',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const shimmerClass = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700';

  if (type === 'cards') {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-border dark:border-gray-700"
          >
            <div className="flex items-start gap-3">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className={cn('w-8 h-8 rounded-full', shimmerClass)}
                style={{
                  backgroundSize: '400px 100%',
                }}
              />
              <div className="flex-1 space-y-2">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className={cn('h-5 rounded w-3/4', shimmerClass)}
                  style={{
                    backgroundSize: '400px 100%',
                  }}
                />
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className={cn('h-4 rounded w-1/2', shimmerClass)}
                  style={{
                    backgroundSize: '400px 100%',
                  }}
                />
                <div className="flex gap-2 mt-3">
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className={cn('h-6 w-16 rounded-full', shimmerClass)}
                    style={{
                      backgroundSize: '400px 100%',
                    }}
                  />
                  <motion.div
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                    className={cn('h-6 w-20 rounded-full', shimmerClass)}
                    style={{
                      backgroundSize: '400px 100%',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'stats') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-border dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className={cn('h-4 w-24 rounded', shimmerClass)}
                  style={{
                    backgroundSize: '400px 100%',
                  }}
                />
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className={cn('h-8 w-16 rounded', shimmerClass)}
                  style={{
                    backgroundSize: '400px 100%',
                  }}
                />
              </div>
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className={cn('w-12 h-12 rounded-full', shimmerClass)}
                style={{
                  backgroundSize: '400px 100%',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
        />
        <span className="text-gray-600 dark:text-gray-400">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;