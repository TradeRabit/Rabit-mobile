import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/atoms';
import { tokens } from '@/constants/theme';

/**
 * Skeleton for the Balance Section on Home
 */
export const BalanceSkeleton = () => (
  <View style={{ gap: 16, marginBottom: 24 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Skeleton width={100} height={20} />
      <Skeleton width={80} height={16} />
    </View>
    <Skeleton width={200} height={48} />
    <Skeleton width={60} height={20} />
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} width="22%" height={64} radius={12} />
      ))}
    </View>
  </View>
);

/**
 * Skeleton for the Asset Explorer / List
 */
export const AssetExplorerSkeleton = () => (
  <View style={{ gap: 16 }}>
    {/* Favorites */}
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} width={140} height={110} radius={12} />
      ))}
    </View>
    {/* Chips */}
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} width={70} height={32} radius={12} />
      ))}
    </View>
    {/* List */}
    {[1, 2, 3, 4, 5].map((i) => (
      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}>
        <Skeleton width={40} height={40} variant="circle" />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="40%" height={16} />
          <Skeleton width="20%" height={12} />
        </View>
        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <Skeleton width={60} height={16} />
          <Skeleton width={40} height={12} />
        </View>
      </View>
    ))}
  </View>
);

/**
 * Skeleton for Asset Detail
 */
export const AssetDetailSkeleton = () => (
  <View style={{ gap: 24 }}>
    {/* Header Info */}
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Skeleton width={48} height={48} variant="circle" />
        <View style={{ gap: 4 }}>
          <Skeleton width={80} height={20} />
          <Skeleton width={40} height={14} />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Skeleton width={180} height={48} />
        <Skeleton width={100} height={20} />
      </View>
    </View>

    {/* Chart Area */}
    <View style={{ gap: 16 }}>
      <Skeleton width="100%" height={250} radius={12} />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} width={50} height={28} radius={8} />
        ))}
      </View>
    </View>

    {/* Stats / Other Info */}
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} width={120} height={80} radius={12} />
      ))}
    </View>

    {/* About Section */}
    <View style={{ gap: 12 }}>
      <Skeleton width={100} height={24} />
      <View style={{ gap: 8 }}>
        <Skeleton width="100%" height={14} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="80%" height={14} />
      </View>
    </View>
  </View>
);

/**
 * Skeleton for History Page
 */
export const HistorySkeleton = () => (
  <View style={{ gap: 16, padding: 16 }}>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <View key={i} style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16, 
        backgroundColor: 'rgba(150,150,150,0.05)',
        borderRadius: 12,
        gap: 12 
      }}>
        <Skeleton width={44} height={44} radius={12} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="50%" height={16} />
          <Skeleton width="30%" height={12} />
        </View>
        <View style={{ alignItems: 'flex-end', gap: 8 }}>
          <Skeleton width={80} height={16} />
          <Skeleton width={40} height={12} />
        </View>
      </View>
    ))}
  </View>
);
