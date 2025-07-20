import { NextRequest, NextResponse } from 'next/server';
import quotesData from '@/data/quotes.json';

// 模拟 AI 生成励志语录的 API
// 在实际项目中，这里会调用 OpenAI API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const language = searchParams.get('language') || 'zh';

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 从静态数据中随机选择一条语录
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const selectedQuote = quotesData[randomIndex];

    // 模拟 AI 生成的响应格式
    const response = {
      id: `ai-${Date.now()}`,
      chinese: selectedQuote.chinese,
      english: selectedQuote.english,
      category: selectedQuote.category,
      generated: true,
      timestamp: new Date().toISOString(),
      meta: {
        model: 'gpt-4',
        tokens: 120,
        category,
        language
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (error) {
    console.error('获取 AI 语录失败:', error);
    
    return NextResponse.json(
      { 
        error: '获取语录失败',
        message: '服务暂时不可用，请稍后再试'
      },
      { status: 500 }
    );
  }
}

// 支持 POST 请求用于生成个性化语录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, days, mood = 'positive' } = body;

    // 验证输入
    if (!prompt && typeof days !== 'number') {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 根据剩余天数生成不同的语录
    let generatedQuote;
    
    if (days > 100) {
      generatedQuote = {
        chinese: `距离高考还有${days}天，时间充裕，正是打牢基础的黄金时期。每一分努力都是为梦想添砖加瓦！`,
        english: `With ${days} days until the exam, there's ample time to build a solid foundation. Every effort is adding bricks to your dream!`
      };
    } else if (days > 30) {
      generatedQuote = {
        chinese: `冲刺阶段的${days}天，是检验你意志力的时候。坚持下去，胜利就在前方！`,
        english: `These ${days} days in the sprint phase test your willpower. Keep going, victory is ahead!`
      };
    } else if (days > 0) {
      generatedQuote = {
        chinese: `最后的${days}天，保持冷静，相信自己的准备。你已经走了这么远，一定能走到最后！`,
        english: `In the final ${days} days, stay calm and trust your preparation. You've come so far, you can make it to the end!`
      };
    } else {
      generatedQuote = {
        chinese: "高考已经开始，发挥出最好的自己，让努力开花结果！",
        english: "The exam has begun, give your best performance and let your efforts bloom!"
      };
    }

    const response = {
      id: `ai-custom-${Date.now()}`,
      ...generatedQuote,
      category: 'ai-generated',
      generated: true,
      timestamp: new Date().toISOString(),
      meta: {
        model: 'gpt-4',
        tokens: 150,
        prompt: prompt || `${days}天倒计时`,
        mood,
        days
      }
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('生成个性化语录失败:', error);
    
    return NextResponse.json(
      { 
        error: '生成失败',
        message: '个性化语录生成失败，请稍后再试'
      },
      { status: 500 }
    );
  }
}

/* 
实际的 AI 集成示例（需要配置 OpenAI API Key）:

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function GET() {
  try {
    const { text } = await generateText({
      model: openai('gpt-4'),
      prompt: `请生成一条高考励志语录，包含中文和英文翻译。
      要求：
      1. 积极向上，鼓舞人心
      2. 适合高考学生
      3. 字数控制在50字以内
      4. 返回JSON格式：{"chinese": "中文", "english": "英文"}`,
    });

    const quote = JSON.parse(text);
    
    return NextResponse.json({
      ...quote,
      id: `ai-${Date.now()}`,
      category: 'ai-generated',
      generated: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('AI 生成失败:', error);
    return NextResponse.json({ error: '生成失败' }, { status: 500 });
  }
}
*/
