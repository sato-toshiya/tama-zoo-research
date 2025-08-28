import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Camera, FileDown, Mail, Share2, Star, Eye, PenTool } from 'lucide-react';

const TamaZooResearchTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    grade: '4',
    category: '',
    difficulty: '',
    freeTextQuery: '',
    selectedTheme: '',
    selectionReason: '',
    observationPoints: [],
    reflection: ''
  });
  const [proposedThemes, setProposedThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 'questions', title: '質問', icon: '?' },
    { id: 'themes', title: 'テーマ提案', icon: '💡' },
    { id: 'selection', title: 'テーマ選択', icon: '✓' },
    { id: 'research', title: '研究中', icon: '🔍' },
    { id: 'reflection', title: '感想', icon: '💭' },
    { id: 'preview', title: 'プレビュー', icon: '📄' }
  ];

  const categories = [
    { id: 'mammal', name: '哺乳類' },
    { id: 'bird', name: '鳥類' },
    { id: 'insect', name: '昆虫' },
    { id: 'other', name: 'その他（比較研究など）' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const getAiThemes = async () => {
    if ((!formData.category || !formData.difficulty) && !formData.freeTextQuery) {
      alert('「おすすめからえらぶ」か「じゆうに書く」のどちらかを入力してね！');
      return;
    }
    setIsLoading(true);
    setProposedThemes([]);
    setCurrentStep(1);

    let userRequest = '';
    if (formData.category && formData.difficulty) {
        const categoryName = categories.find(c => c.id === formData.category)?.name || '';
        const difficultyText = formData.difficulty === '1' ? '簡単な観察中心' : formData.difficulty === '2' ? '少し詳しい比較や分析' : 'より深い研究';
        userRequest += `・希望カテゴリ: ${categoryName}\n・希望難易度: ${difficultyText}\n`;
    }
    if (formData.freeTextQuery) {
        userRequest += `・自由記述: ${formData.freeTextQuery}\n`;
    }

     const prompt = `あなたは、東京の「多摩動物公園」の自由研究をサポートする、非常に優秀なAIアシスタントです。

# あなたの役割
ユーザーの希望に合わせて、小学生がワクワクするような、具体的で観察可能な自由研究のテーマを3つ提案してください。

# 厳守するルール
- 提案するテーマは、必ず「多摩動物公園」で観察できる動物や昆虫を題材にしてください。
- ユーザーの希望が具体的な動物名でなくても、関連する面白い研究を考えてください。
- 「動物の比較」など、複数の動物や昆虫を横断的に観察するような、ユニークな視点のテーマも積極的に提案してください。

# 多摩動物公園の主な動物・昆虫（参考）
- アフリカ園: ライオン, キリン, シマウマ, サーバル, チーター, アフリカゾウ
- アジア園: レッサーパンダ, オランウータン, トラ, ユキヒョウ, マレーバク, インドサイ
- オーストラリア園: コアラ, カンガルー, ワラビー, エミュー
- 昆虫園: 世界中の様々なチョウ, ハキリアリ, グローワーム, ホタル

# ユーザー情報
- 学年: 小学${formData.grade}年生
- ユーザーの希望:
${userRequest}

# 出力形式
あなたの応答は、以下のJSON形式の例に厳密に従ってください。他のテキストは一切含めず、このJSONオブジェクトのみを返してください。

\`\`\`json
{
  "themes": [
    {
      "id": 1,
      "title": "（ここに1つ目のテーマ名）",
      "question": "（ここに中心的な問い）",
      "guide": "（ここに観察のヒント）",
      "points": [
        { "id": 1, "title": "（ポイント1のタイトル）", "question": "（ポイント1の問い）", "guide": "（ポイント1のヒント）" },
        { "id": 2, "title": "（ポイント2のタイトル）", "question": "（ポイント2の問い）", "guide": "（ポイント2のヒント）" },
        { "id": 3, "title": "（ポイント3のタイトル）", "question": "（ポイント3の問い）", "guide": "（ポイント3のヒント）" },
        { "id": 4, "title": "（ポイント4のタイトル）", "question": "（ポイント4の問い）", "guide": "（ポイント4のヒント）" }
      ]
    },
    {
      "id": 2,
      "title": "（ここに2つ目のテーマ名）",
      "question": "（ここに中心的な問い）",
      "guide": "（ここに観察のヒント）",
      "points": [
        { "id": 1, "title": "...", "question": "...", "guide": "..." },
        { "id": 2, "title": "...", "question": "...", "guide": "..." },
        { "id": 3, "title": "...", "question": "...", "guide": "..." },
        { "id": 4, "title": "...", "question": "...", "guide": "..." }
      ]
    },
    {
      "id": 3,
      "title": "（ここに3つ目のテーマ名）",
      "question": "（ここに中心的な問い）",
      "guide": "（ここに観察のヒント）",
      "points": [
        { "id": 1, "title": "...", "question": "...", "guide": "..." },
        { "id": 2, "title": "...", "question": "...", "guide": "..." },
        { "id": 3, "title": "...", "question": "...", "guide": "..." },
        { "id": 4, "title": "...", "question": "...", "guide": "..." }
      ]
    }
  ]
}
\`\`\`
`;

    try {
      const response = await fetch('/api/generate-themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error('AIとの通信に失敗しました。サーバーログを確認してください。');
      }

      const themes = await response.json();
      setProposedThemes(themes);

    } catch (error) {
      console.error(error);
      alert(error.message || "エラーが発生しました。もう一度お試しください。");
      setCurrentStep(0);
    } finally {
      setIsLoading(false);
    }
  };

  const selectTheme = (theme) => {
    // AIからの応答にユニークIDを付与して、問題を確実に解決する
    const initialPoints = (theme.points || []).map((point, index) => ({
      ...point,
      // AIがidを返し忘れても、ここでユニークなID (0, 1, 2, 3...) を保証する
      id: point.id || index, 
      hypothesis: '',
      observation: '',
      observationImage: null,
      insights: ''
    }));

    setFormData(prev => ({
      ...prev,
      selectedTheme: theme.title,
      observationPoints: initialPoints
    }));
  };
  
  const updateObservationPoint = (pointId, field, value) => {
    const updatedPoints = formData.observationPoints.map(point => point.id === pointId ? { ...point, [field]: value } : point);
    setFormData(prev => ({ ...prev, observationPoints: updatedPoints }));
  };
  
  const handleImageUpload = (pointId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { updateObservationPoint(pointId, 'observationImage', reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const renderQuestions = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-jpTitle text-center text-green-800 mb-6">きみのことを教えてね！</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <label className="block text-lg font-bold text-gray-700 mb-3">① がくねん</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[1,2,3,4,5,6].map(grade => (<button key={grade} onClick={() => handleInputChange('grade', grade.toString())} className={`p-3 rounded-lg border-2 text-md font-bold transition-colors ${formData.grade === grade.toString() ? 'border-green-500 bg-green-100 text-green-800' : 'border-gray-300 hover:border-green-300'}`}>{grade}年生</button>))}
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
        <label className="block text-lg font-bold text-gray-700 mb-3">② おすすめからえらぶ</label>
        <div className="space-y-4">
            <select onChange={(e) => handleInputChange('category', e.target.value)} value={formData.category} className="w-full p-3 border-2 border-gray-300 rounded-lg">
                <option value="">カテゴリを選んでね</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <div className="grid grid-cols-3 gap-2">
                {[{level: '1', label: 'かんたん'}, {level: '2', label: 'ふつう'}, {level: '3', label: 'むずかしい'}].map(item => (<button key={item.level} onClick={() => handleInputChange('difficulty', item.level)} className={`p-3 rounded-lg border-2 text-center transition-colors bg-white ${formData.difficulty === item.level ? 'border-green-500' : 'border-gray-300 hover:border-green-300'}`}><div className="font-bold">{item.label}</div><div className="flex justify-center mt-1">{[...Array(parseInt(item.level))].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div></button>))}
            </div>
        </div>
      </div>
      <div className="relative flex items-center"><hr className="w-full border-t border-gray-300" /><span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-gray-500">または</span></div>
      <div className="bg-yellow-50 p-6 rounded-lg shadow-inner border border-yellow-200">
        <label className="block text-lg font-bold text-gray-700 mb-3">③ じゆうに書く</label>
        <textarea value={formData.freeTextQuery} onChange={(e) => handleInputChange('freeTextQuery', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-yellow-500 focus:outline-none" rows="3" placeholder="例：ライオンのたてがみ、昆虫館のチョウ、チーターとサーバルネコの比較" />
      </div>
      <button onClick={getAiThemes} disabled={!formData.grade || ((!formData.category || !formData.difficulty) && !formData.freeTextQuery)} className="w-full bg-yellow-400 text-gray-800 text-xl font-bold py-4 px-6 rounded-lg hover:bg-yellow-500 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2">
        <span className="text-2xl">🤖</span> AIにテーマを考えてもらう！
      </button>
    </div>
  );

  const renderThemes = () => {
    const renderSummary = () => {
        if (formData.category) {
            const categoryName = categories.find(c => c.id === formData.category)?.name || '';
            return `小学${formData.grade}年生向け「${categoryName}」のテーマをAIが考えました！`;
        }
        if (formData.freeTextQuery) {
            return `小学${formData.grade}年生の「${formData.freeTextQuery}」という希望に合わせて、AIがテーマを考えました！`;
        }
        return `小学${formData.grade}年生向けのテーマをAIが考えました！`;
    };

    if (isLoading) {
      return (
        <div className="text-center p-8"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div><p className="mt-4 text-lg font-semibold text-green-700 font-jpTitle">AIががんばって考えているよ...</p></div>
      );
    }
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-800 mb-6 font-jpTitle">🎯 AIから３つのテーマがとどいたよ！</h2>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"><p className="text-blue-800">{renderSummary()}</p></div>
            <div className="space-y-4">
                {proposedThemes.length > 0 ? proposedThemes.map((theme, index) => (
                    <div key={theme.id || index} className={`bg-white p-6 rounded-lg shadow-md border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.selectedTheme === theme.title ? 'border-green-500 bg-green-50 scale-105' : 'border-gray-200 hover:border-green-300'}`} onClick={() => selectTheme(theme)}>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl text-yellow-500 bg-yellow-100 p-3 rounded-full">{[<Eye />, <PenTool />, <Star />][index % 3]}</div>
                            <div className="flex-1"><h3 className="text-lg font-bold text-gray-800 mb-2">{theme.title}</h3><p className="text-gray-600 text-sm mb-3">{theme.guide}</p><div className="text-sm text-blue-600 bg-blue-50 p-2 rounded"><strong>中心的な問い：</strong>{theme.question}</div></div>
                            {formData.selectedTheme === theme.title && (<div className="text-green-500"><Eye className="w-8 h-8" /></div>)}
                        </div>
                    </div>
                )) : <p className="text-center text-gray-600">テーマの提案がありません。前の画面に戻ってやり直してください。</p>}
            </div>
            <div className="flex gap-4 pt-4">
                <button onClick={() => setCurrentStep(0)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> 戻る</button>
                <button onClick={nextStep} disabled={!formData.selectedTheme} className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">このテーマに決める <ChevronRight className="w-5 h-5" /></button>
            </div>
        </div>
    );
  };
  
  const renderSelection = () => {
    // 選択された理由を管理するためのヘルパー関数
    const handleReasonChange = (reason, isChecked) => {
      // 現在の理由をカンマで区切って配列にする（空の要素は除く）
      const currentReasons = formData.selectionReason.split(',').filter(r => r.trim());
      let newReasons;

      if (isChecked) {
        // チェックされたら理由を追加
        newReasons = [...currentReasons, reason];
      } else {
        // チェックが外されたら理由を削除
        newReasons = currentReasons.filter(r => r !== reason);
      }
      // 配列を再びカンマ区切りの文字列に戻してstateを更新
      handleInputChange('selectionReason', newReasons.join(','));
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-green-800 mb-6 font-jpTitle">📝 このテーマを選んだ理由</h2>
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
          <h3 className="text-lg font-bold text-green-800 mb-2">選んだテーマ</h3>
          <p className="text-green-700">{formData.selectedTheme}</p>
        </div>

        {/* --- 選択式の理由 --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            あてはまるものを選んでね（いくつでもOK）
          </label>
          <div className="space-y-3">
            {[
              '動物が好きだから',
              '面白そうだから',
              '新しいことを発見したいから',
              'くらべる研究がしたかったから',
              '動物園でよく見る動物だから'
            ].map(reason => (
              <label key={reason} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
                  // 現在の理由にこの選択肢が含まれているかをチェック
                  checked={formData.selectionReason.includes(reason)}
                  onChange={(e) => handleReasonChange(reason, e.target.checked)}
                />
                <span className="text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* --- 自由記述の理由 --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            他に理由があれば自由に書いてね
          </label>
          <textarea
            value={formData.selectionReason}
            onChange={(e) => handleInputChange('selectionReason', e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            rows="4"
            placeholder="例：面白そうだから。いつも寝ているけど、他の時は何をしているか気になったから。"
          />
        </div>

        <div className="flex gap-4">
          <button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> 戻る</button>
          <button onClick={nextStep} className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">研究を始める <ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    );
  };
  const renderResearch = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6 font-jpTitle">🔍 たんけんノート</h2>
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500"><h3 className="text-lg font-bold text-blue-800 mb-2">研究テーマ</h3><p className="text-blue-700">{formData.selectedTheme}</p></div>
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400"><p className="text-yellow-800"><strong>📋 研究の進め方：</strong>それぞれの観察テーマについて、まず「予想」をしてから、実際に「観察」して、最後に「発見や気づき」を書いてみよう！</p></div>
      {formData.observationPoints.map((point, index) => (
        <div key={point.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
          <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2"><span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">{index + 1}</span>{point.question}</h3>
          <div className="bg-green-50 p-4 rounded-lg mb-4"><p className="text-green-700 text-sm"><span className="font-bold">🎯 調べるヒント：</span>{point.guide}</p></div>
          <div className="space-y-4">
            <div><label className="block text-md font-semibold text-gray-700 mb-2">💡 予想してみよう！</label><textarea value={point.hypothesis} onChange={(e) => updateObservationPoint(point.id, 'hypothesis', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg" rows="2" placeholder="きっと〇〇だと思う！その理由は..."/></div>
            <div><label className="block text-md font-semibold text-gray-700 mb-2">👀 実際に見てわかったこと</label><textarea value={point.observation} onChange={(e) => updateObservationPoint(point.id, 'observation', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg mb-3" rows="3" placeholder="実際に見た様子を詳しく書こう！"/><div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"><input type="file" accept="image/*" onChange={(e) => handleImageUpload(point.id, e)} className="hidden" id={`photo-upload-${point.id}`}/><label htmlFor={`photo-upload-${point.id}`} className="cursor-pointer"><Camera className="w-8 h-8 text-gray-400 mx-auto mb-1" /><p className="text-gray-600 text-sm">📷 写真やスケッチを追加</p>{point.observationImage && <img src={point.observationImage} alt="Observation" className="mt-2 max-h-40 mx-auto rounded"/>}</label></div></div>
            <div><label className="block text-md font-semibold text-gray-700 mb-2">✨ 新しい発見・気づいたこと</label><textarea value={point.insights} onChange={(e) => updateObservationPoint(point.id, 'insights', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg" rows="3" placeholder="予想と違ったこと、びっくりしたこと、もっと知りたいことなどを書こう！"/></div>
          </div>
        </div>
      ))}
      <div className="flex gap-4"><button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> 戻る</button><button onClick={nextStep} className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">感想を書く <ChevronRight className="w-5 h-5" /></button></div>
    </div>
  );

  const renderReflection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6 font-jpTitle">💭 感想・まとめ</h2>
      <div className="bg-white p-6 rounded-lg shadow-md"><label className="block text-lg font-semibold text-gray-700 mb-3">今回の研究はどうでしたか？感想を自由に書いてください</label><textarea value={formData.reflection} onChange={(e) => handleInputChange('reflection', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" rows="8" placeholder="楽しかったこと、難しかったこと、新しく知ったこと、もっと調べたいことなど、何でも書いてください..." /></div>
      <div className="flex gap-4"><button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> 戻る</button><button onClick={nextStep} className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">プレビューを見る <ChevronRight className="w-5 h-5" /></button></div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6 font-jpTitle">📄 研究レポート完成！</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200" id="report-content">
        <h1 className="text-3xl font-bold text-center mb-2 font-jpTitle">{formData.selectedTheme}</h1>
        <p className="text-center text-lg mb-6">名前：＿＿＿＿＿＿＿＿＿</p>
        <div className="space-y-6">
            <div><h3 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-1 mb-2">1. 研究のきっかけ</h3><p>{formData.selectionReason || '(未記入)'}</p></div>
            {formData.observationPoints.map((point, index) => (
                <div key={point.id}>
                    <h3 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-1 mb-2">{index + 2}. 「{point.title}」の観察</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold">▶︎ 予想</h4><p className="bg-gray-100 p-3 rounded">{point.hypothesis || '(未記入)'}</p>
                            <h4 className="font-bold mt-4">▶︎ 実際の観察</h4><p className="bg-gray-100 p-3 rounded">{point.observation || '(未記入)'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">▶︎ 発見・気づき</h4><p className="bg-yellow-100 p-3 rounded border border-yellow-300">{point.insights || '(未記入)'}</p>
                             {point.observationImage && (<><h4 className="font-bold mt-4">▶︎ 写真・スケッチ</h4><img src={point.observationImage} alt="Observation" className="mt-1 max-w-full mx-auto rounded border"/></>)}
                        </div>
                    </div>
                </div>
            ))}
            <div><h3 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-1 mb-2">最後のまとめ・感想</h3><p>{formData.reflection || '(未記入)'}</p></div>
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg"><h3 className="text-lg font-bold text-blue-800 mb-4">📤 レポートを保存・共有</h3><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><button onClick={() => window.print()} className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"><FileDown className="w-5 h-5" /> 印刷 / PDF保存</button><button onClick={() => alert("この機能は開発中です")} className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"><Mail className="w-5 h-5" /> メール送信</button><button onClick={() => alert("この機能は開発中です")} className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"><Share2 className="w-5 h-5" /> SNS共有</button></div></div>
      <div className="flex gap-4"><button onClick={prevStep} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"><ChevronLeft className="w-5 h-5" /> 戻る</button></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="text-center p-6 bg-white rounded-xl shadow-lg border-4 border-yellow-300 my-8 max-w-3xl mx-auto">
        <h1 className="font-jpTitle text-4xl md:text-5xl text-green-800">zooっと自由研究 🦁</h1>
      </header>
      <div className="max-w-4xl mx-auto p-4 mb-8">
        <div className="flex items-center justify-between bg-white p-3 rounded-full shadow-md">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-center gap-2 text-sm md:text-base ${index === currentStep ? 'text-green-600 font-bold' : index < currentStep ? 'text-green-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${index === currentStep ? 'bg-green-600 text-white scale-110' : index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                {index < currentStep ? '✓' : step.icon}
              </div>
              <span className="hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      <main className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border-2 border-green-200 min-h-[400px]">
        {currentStep === 0 && renderQuestions()}
        {currentStep === 1 && renderThemes()}
        {currentStep === 2 && renderSelection()}
        {currentStep === 3 && renderResearch()}
        {currentStep === 4 && renderReflection()}
        {currentStep === 5 && renderPreview()}
      </main>
      <footer className="text-center p-6 text-gray-500">
        © 2025 zooっと自由研究
      </footer>
    </div>
  );
};

export default TamaZooResearchTool;